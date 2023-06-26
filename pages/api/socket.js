import httpProxy from 'http-proxy';

export default function handler(req, res) {
  const proxy = httpProxy.createProxyServer({
    target: process.env.NEXT_PUBLIC_URR_BASE, // Thay đổi địa chỉ IP và cổng tại đây
    ws: true, // Cho phép proxy WebSocket
  });

  proxy.on('error', (err) => {
    console.error('WebSocket proxy error:', err);
    res.statusCode = 500;
    res.end('WebSocket proxy error');
  });

  proxy.web(req, res, { target: req.url });
}