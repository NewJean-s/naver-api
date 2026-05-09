const app = require('express')();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.get('/', (req, res) => {
  res.send('https://github.com/idhts2081/naverme-api');
});

app.get('/shorten', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({
      error: 'url query is required'
    });
  }

  try {
    const targetUrl =
      'https://me2do.naver.com/common/requestJsonpV2.nhn' +
      `?svcCode=0&url=${encodeURIComponent(
        `https://link.naver.com/bridge?url=${url}`
      )}`;

    const resp = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: '*/*',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        Referer: 'https://link.naver.com/',
        Origin: 'https://link.naver.com'
      }
    });

    const text = await resp.text();
    const trimmed = text.trim();

    const json = JSON.parse(trimmed.slice(1, -1));

    return res.json({
      result: {
        data: json.result.httpsUrl
      }
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: 'Failed to shorten URL',
      detail: String(err)
    });
  }
});

module.exports = app;
