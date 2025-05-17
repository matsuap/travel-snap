// @ts-nocheck
// import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parse } from 'querystring';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    // Read form-urlencoded body
    let bodyData = '';
    req.on('data', chunk => bodyData += chunk);
    await new Promise<void>(resolve => req.on('end', () => resolve()));
    const params = parse(bodyData);
    const title = Array.isArray(params.title) ? params.title[0] : params.title;
    const url = Array.isArray(params.url) ? params.url[0] : params.url;
    const text = Array.isArray(params.text) ? params.text[0] : params.text;
    // Redirect to client-side /share route with query params
    const redirectUrl = `/share?title=${encodeURIComponent(String(title))}&url=${encodeURIComponent(String(url))}&text=${encodeURIComponent(String(text))}`;
    res.writeHead(303, { Location: redirectUrl });
    return res.end();
  }
  // Fallback for GET or other methods: redirect to root
  res.writeHead(302, { Location: '/' });
  res.end();
} 