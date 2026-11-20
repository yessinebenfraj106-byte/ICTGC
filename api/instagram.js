module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  const defaultFollowers = '3 584+';

  const userAgents = [
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Twitterbot/1.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  ];

  for (const ua of userAgents) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const resp = await fetch('https://www.instagram.com/ic.tunisgolfecarthagene/', {
        signal: controller.signal,
        headers: {
          'User-Agent': ua,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9'
        }
      });

      clearTimeout(timeoutId);

      if (resp.ok) {
        const html = await resp.text();
        const match = html.match(/content="([0-9.,kKmM\s]+)\s+Followers/i) ||
                      html.match(/([0-9.,kKmM\s]+)\s+Followers/i);
        if (match && match[1]) {
          const raw = match[1].replace(/,/g, '').trim();
          const num = parseInt(raw, 10);
          if (!isNaN(num) && num > 100) {
            const formatted = num.toLocaleString('fr-FR').replace(/\u202f/g, ' ') + '+';
            return res.status(200).json({ success: true, followers: formatted, raw: num, source: 'live' });
          }
        }
      }
    } catch (err) {}
  }

  return res.status(200).json({ success: true, followers: defaultFollowers, source: 'current' });
};
