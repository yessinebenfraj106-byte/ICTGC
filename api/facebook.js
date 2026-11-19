module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=180');

  const defaultFollowers = '9 414+';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const pluginUrl = 'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FICTGC&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true';
    
    const resp = await fetch(pluginUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8'
      }
    });

    clearTimeout(timeoutId);

    if (resp.ok) {
      const html = await resp.text();
      const match = html.match(/([0-9\s\u202f\u00a0,.]+)\s*(?:followers|abonn[ée]s)/i);
      if (match && match[1]) {
        const raw = match[1].replace(/[\s\u202f\u00a0,.]/g, '').trim();
        const num = parseInt(raw, 10);
        if (!isNaN(num) && num > 1000) {
          const formatted = num.toLocaleString('fr-FR') + '+';
          return res.status(200).json({ success: true, followers: formatted, raw: num, source: 'live' });
        }
      }
    }

    return res.status(200).json({ success: true, followers: defaultFollowers, source: 'fallback' });
  } catch (err) {
    return res.status(200).json({ success: false, followers: defaultFollowers, source: 'error' });
  }
};
