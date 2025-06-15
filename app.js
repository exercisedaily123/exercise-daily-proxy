const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing "url" query parameter');
  }

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    const $ = cheerio.load(response.data);
    const title = $('title').text() || '';
    const metaDesc = $('meta[name="description"]').attr('content') || '';
    const canonical = $('link[rel="canonical"]').attr('href') || targetUrl;
    const favicon = $('link[rel="icon"]').attr('href') || '/favicon.ico';

    res.json({
      title,
      description: metaDesc,
      canonical,
      favicon: favicon.startsWith('http') ? favicon : new URL(favicon, targetUrl).href,
      source: targetUrl
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Failed to fetch or parse target URL');
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🔄 Proxy parser running at http://localhost:${PORT}`);
});

