import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const rssProxyPlugin = () => ({
  name: 'rss-proxy',
  configureServer(server) {
    server.middlewares.use('/api/rss', async (req, res) => {
      const parsedUrl = new URL(req.url, 'http://localhost');
      const targetUrl = parsedUrl.searchParams.get('url');

      if (!targetUrl) {
        res.statusCode = 400;
        res.end('Missing url parameter');
        return;
      }

      try {
        const feedRes = await fetch(targetUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml, */*'
          }
        });

        if (!feedRes.ok) {
          res.statusCode = feedRes.status;
          res.end(`Feed responded with status ${feedRes.status}`);
          return;
        }

        const text = await feedRes.text();
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-cache');
        res.end(text);
      } catch (err) {
        res.statusCode = 500;
        res.end(err.message || 'Failed to fetch RSS feed');
      }
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use('/api/rss', async (req, res) => {
      const parsedUrl = new URL(req.url, 'http://localhost');
      const targetUrl = parsedUrl.searchParams.get('url');

      if (!targetUrl) {
        res.statusCode = 400;
        res.end('Missing url parameter');
        return;
      }

      try {
        const feedRes = await fetch(targetUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml, */*'
          }
        });

        if (!feedRes.ok) {
          res.statusCode = feedRes.status;
          res.end(`Feed responded with status ${feedRes.status}`);
          return;
        }

        const text = await feedRes.text();
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-cache');
        res.end(text);
      } catch (err) {
        res.statusCode = 500;
        res.end(err.message || 'Failed to fetch RSS feed');
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), rssProxyPlugin()],
})

