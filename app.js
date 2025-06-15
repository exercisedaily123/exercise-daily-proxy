const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('Missing "url" query parameter');
    }

    request({ url: targetUrl, headers: { 'User-Agent': 'Mozilla/5.0' } })
        .on('error', (err) => res.status(500).send('Proxy error: ' + err))
        .pipe(res);
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});