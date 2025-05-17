const { parse } = require('querystring');

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    await new Promise(resolve => req.on('end', resolve));

    const params = parse(body);
    const title = Array.isArray(params.title) ? params.title[0] : params.title || '';
    const url = Array.isArray(params.url) ? params.url[0] : params.url || '';
    const text = Array.isArray(params.text) ? params.text[0] : params.text || '';

    const redirectUrl = '/share'
      + '?title=' + encodeURIComponent(title)
      + '&url='   + encodeURIComponent(url)
      + '&text='  + encodeURIComponent(text);

    res.writeHead(303, { Location: redirectUrl });
    return res.end();
  }

  // Fallback for other methods
  res.writeHead(302, { Location: '/' });
  res.end();
}; 