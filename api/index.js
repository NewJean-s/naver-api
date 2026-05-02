const app = require('express')();

app.get('/', (req, res) => {
  res.send('https://github.com/idhts2081/_NaverAPI');
});

app.get('/shorten', (req, res) => {
  res.setHeader('Access-Control-Allow-origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  var url = req.query.url;
  
  async function generate(link) {
    const resp = await fetch(
      `https://me2do.naver.com/common/requestJsonpV2.nhn?svcCode=0&url=https://link.naver.com/bridge?url=${link}`,
      { method: 'POST', headers: { Referer: 'link.naver.com' } },
    );
    
    const data = await resp.text();
    const json = JSON.parse(data.trim().slice(1, -1));
    const result = `{"result":{"data":"${json.result.httpsUrl}"}}`
    res.json(JSON.parse(result))
  };

  generate(url)
});

module.exports = app;
