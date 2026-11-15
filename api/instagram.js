module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');

  const username = 'ic.tunisgolfecarthagene';
  const defaultFollowers = '3 140+';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const resp = await fetch(`https://www.instagram.com/${username}/`, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    clearTimeout(timeoutId);

    if (resp.ok) {
      const html = await resp.text();
      const metaMatch = html.match(/content="([0-9.,kKmM]+)\s+(?:Followers|Abonnés|abonnés)/i);
      const jsonMatch = html.match(/"edge_followed_by":\s*\{\s*"count":\s*(\d+)\s*\}/);

      if (metaMatch && metaMatch[1]) {
        const count = metaMatch[1].trim();
        return res.status(200).json({ success: true, followers: count + '+' });
      }

      if (jsonMatch && jsonMatch[1]) {
        const num = parseInt(jsonMatch[1], 10);
        const formatted = num.toLocaleString('fr-FR') + '+';
        return res.status(200).json({ success: true, followers: formatted });
      }
    }

    return res.status(200).json({ success: true, followers: defaultFollowers });
  } catch (err) {
    return res.status(200).json({ success: false, followers: defaultFollowers });
  }
};
