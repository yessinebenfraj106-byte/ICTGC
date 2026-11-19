module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=180');

  const defaultFollowers = '3 601+';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const resp = await fetch('https://www.instagram.com/ic.tunisgolfecarthagene/', {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    clearTimeout(timeoutId);

    if (resp.ok) {
      const html = await resp.text();
      const match = html.match(/content="([0-9.,kKmM\s]+)\s+Followers/i);
      if (match && match[1]) {
        const raw = match[1].replace(/,/g, '').trim();
        const num = parseInt(raw, 10);
        if (!isNaN(num) && num > 100) {
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
