const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get('/', (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('Missing "url" query parameter');
  }

  const options = {
    url: url,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  };

  request(options).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
