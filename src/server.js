require('dotenv').config();
const express = require('express');
const cors = require('cors');                 // ← ADD THIS
const { openaiText, openaiImage } = require('./openai-client');
const { publishPost } = require('./wordpress-client');
const { mdToHtml, saveRecord, ensureDataFile } = require('./helpers');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const app = express();

// --------------------------------
// Global middlewares
// --------------------------------
app.use(cors());                              // ← REQUIRED FOR FRONTEND TO WORK
app.use(express.json());                      // Replaces bodyParser.json()

// --------------------------------
// Config
// --------------------------------
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || 'change_me';
const DATA_FILE = process.env.DATA_FILE || './data/posts.json';

// Ensure data file exists
ensureDataFile(DATA_FILE);

// --------------------------------
// Basic endpoints
// --------------------------------
app.get('/', (req, res) => res.send('BlogForge is live'));

app.get('/logs', (req, res) => {
  const arr = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json({ count: arr.length, items: arr.slice(-10) });
});

// --------------------------------
// Main Publish Route
// --------------------------------
app.post('/publish', async (req, res) => {
  try {
    // ------------------------------ AUTH ------------------------------
    const key = req.headers['x-api-key'] || req.headers['authorization'];
    if (!key || (key !== API_KEY && key !== `Bearer ${API_KEY}`)) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    const body = req.body || {};
    const prompt = body.prompt;
    const noteId = body.note_id || null;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ status: 'error', message: 'Empty prompt' });
    }

    // ------------------------------ OPENAI CONTENT GEN ------------------------------
    const instruct = `
You are an expert blog writer and SEO assistant. Given the user's request below, produce a JSON object with exact fields:
{
  "seo_title": "Short SEO friendly title",
  "meta_description": "Short meta description (<160 chars)",
  "markdown": "Full blog in markdown format with H2, 5 bullet points and a conclusion",
  "banner_prompt": "A short text prompt suitable for generating a banner image"
}
User request:
"""${prompt}"""
`;

    const aiRaw = await openaiText(instruct);

    // Parse JSON from OpenAI safely
    let aiJson = null;
    try {
      const start = aiRaw.indexOf('{');
      const end = aiRaw.lastIndexOf('}');
      aiJson = JSON.parse(aiRaw.slice(start, end + 1));
    } catch (err) {
      aiJson = {
        seo_title: prompt.slice(0, 60),
        meta_description: prompt.slice(0, 150),
        markdown: `# ${prompt}\n\n- Placeholder\n\n`,
        banner_prompt: `${prompt} banner image`
      };
    }

    // ------------------------------ IMAGE GEN ------------------------------
    let bannerUrl = null;
    try {
      bannerUrl = await openaiImage(aiJson.banner_prompt);
    } catch (err) {
      bannerUrl = null;
    }

    // ------------------------------ MD → HTML ------------------------------
    const html = mdToHtml(aiJson.markdown);

    // ------------------------------ PUBLISH TO WORDPRESS ------------------------------
    let wpResult = null;
    try {
      wpResult = await publishPost({
        title: aiJson.seo_title,
        html,
        bannerUrl,
        excerpt: aiJson.meta_description
      });
    } catch (err) {
      console.error('WP publish failed', err.response ? err.response.data : err.message);
      return res.status(500).json({ status: 'error', message: 'Failed publishing to WordPress' });
    }

    // ------------------------------ LOG SUCCESS ------------------------------
    const record = {
      id: uuidv4(),
      noteId,
      prompt,
      createdAt: new Date().toISOString(),
      title: aiJson.seo_title,
      postUrl: wpResult.link || wpResult.guid?.rendered || null,
      wpFull: wpResult
    };

    saveRecord(DATA_FILE, record);

    return res.status(200).json({
      status: 'success',
      message: 'Workflow executed',
      postUrl: record.postUrl
    });

  } catch (err) {
    console.error('Unexpected error', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// --------------------------------
// Start Server
// --------------------------------
app.listen(PORT, () => console.log(`BlogForge running on port ${PORT}`));
