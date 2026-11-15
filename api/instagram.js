module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=300');

  const username = 'ic.tunisgolfecarthagene';
  const defaultFollowers = '3 601+';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const resp = await fetch(`https://www.instagram.com/${username}/`, {
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
      const metaMatch = html.match(/content="([0-9.,kKmM\s]+)\s+(?:Followers|Abonn[ée]s|abonn[ée]s)/i) ||
                        html.match(/([0-9.,kKmM]+)\s+(?:Followers|Abonn[ée]s|abonn[ée]s)/i);
      const jsonMatch = html.match(/"edge_followed_by":\s*\{\s*"count":\s*(\d+)\s*\}/);

      if (metaMatch && metaMatch[1]) {
        const rawCount = metaMatch[1].trim().replace(/\s+/g, '');
        const cleanNum = parseInt(rawCount.replace(/,/g, ''), 10);
        if (!isNaN(cleanNum) && cleanNum > 0) {
          const formatted = cleanNum.toLocaleString('fr-FR') + '+';
          return res.status(200).json({ success: true, followers: formatted, raw: cleanNum });
        }
        return res.status(200).json({ success: true, followers: rawCount + '+' });
      }

      if (jsonMatch && jsonMatch[1]) {
        const num = parseInt(jsonMatch[1], 10);
        const formatted = num.toLocaleString('fr-FR') + '+';
        return res.status(200).json({ success: true, followers: formatted, raw: num });
      }
    }

    return res.status(200).json({ success: true, followers: defaultFollowers });
  } catch (err) {
    return res.status(200).json({ success: false, followers: defaultFollowers });
  }
};
