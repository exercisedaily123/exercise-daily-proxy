const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get("/", async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Missing "url" query parameter');
  }

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      timeout: 10000,
    });

    res.set(response.headers);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Error fetching URL:", error.message);
    res
      .status(error.response?.status || 500)
      .send(
        error.response?.data ||
          "Error fetching target URL. Amazon might be blocking this proxy."
      );
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
