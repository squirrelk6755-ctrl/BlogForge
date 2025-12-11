const axios = require('axios');

const WP_BASE = process.env.WP_BASE_URL; // e.g. https://your-site.com
const WP_USER = process.env.WP_USERNAME;
const WP_APP = process.env.WP_APP_PASSWORD;

const b64 = Buffer.from(`${WP_USER}:${WP_APP}`).toString('base64');
const AUTH_HEADER = { Authorization: `Basic ${b64}` };

async function publishPost({ title, html, bannerUrl = null, excerpt = '' }) {
  const endpoint = `${WP_BASE.replace(/\/$/, '')}/wp-json/wp/v2/posts`;
  const data = { title, content: html, excerpt, status: 'publish' };
  if (bannerUrl) data.content = `<img src="${bannerUrl}" alt="banner" style="max-width:100%;height:auto;" />\n\n` + data.content;
  const res = await axios.post(endpoint, data, { headers: { ...AUTH_HEADER, 'Content-Type': 'application/json' } });
  return res.data;
}

module.exports = { publishPost };
