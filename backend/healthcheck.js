const http = require('http');
const port = process.env.PORT || 4000;
const req = http.request({ host: '127.0.0.1', port, path: '/api/v1/health', timeout: 3000 }, (res) => {
  process.exit(res.statusCode >= 200 && res.statusCode < 400 ? 0 : 1);
});
req.on('error', () => process.exit(1));
req.on('timeout', () => { req.destroy(); process.exit(1); });
req.end();
