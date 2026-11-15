module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=300');

  const defaultFollowers = '9 414+';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const resp = await fetch('https://www.facebook.com/ICTGC/', {
      signal: controller.signal,
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    clearTimeout(timeoutId);

    if (resp.ok) {
      const html = await resp.text();
      const metaMatch = html.match(/content="[^"]*?([0-9.,\s\u202f\u00a0]+)\s+followers/i) ||
                        html.match(/([0-9.,\s\u202f\u00a0]+)\s+followers/i);
      if (metaMatch && metaMatch[1]) {
        const raw = metaMatch[1].replace(/[\s\u202f\u00a0,]/g, '').trim();
        const num = parseInt(raw, 10);
        if (!isNaN(num) && num > 0) {
          const formatted = num.toLocaleString('fr-FR') + '+';
          return res.status(200).json({ success: true, followers: formatted, raw: num });
        }
      }
    }
    return res.status(200).json({ success: true, followers: defaultFollowers });
  } catch (err) {
    return res.status(200).json({ success: false, followers: defaultFollowers });
  }
};
