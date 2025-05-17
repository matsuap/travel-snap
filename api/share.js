import { parse } from 'querystring';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }
    const params = parse(body);
    const title = Array.isArray(params.title) ? params.title[0] : params.title || '';
    const url = Array.isArray(params.url) ? params.url[0] : params.url || '';
    const text = Array.isArray(params.text) ? params.text[0] : params.text || '';
    const redirectUrl = '/share'
      + '?title=' + encodeURIComponent(title)
      + '&url='   + encodeURIComponent(url)
      + '&text='  + encodeURIComponent(text);
    res.writeHead(303, { Location: redirectUrl });
    res.end();
    return;
  }
  // Fallback for other methods
  res.writeHead(302, { Location: '/' });
  res.end();
} 