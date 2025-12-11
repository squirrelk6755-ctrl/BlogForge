const axios = require('axios');
const OPENAI_KEY = process.env.OPENAI_API_KEY;

const openaiText = async (prompt) => {
  if (!OPENAI_KEY) throw new Error('OPENAI_API_KEY not set');
  const url = 'https://api.openai.com/v1/chat/completions';
  const resp = await axios.post(url, {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful blog writer. Produce markdown blog posts with SEO title, meta and bullet points." },
      { role: "user", content: prompt }
    ],
    temperature: 0.6,
    max_tokens: 1200
  }, {
    headers: { Authorization: `Bearer ${OPENAI_KEY}` }
  });
  return resp.data.choices[0].message.content;
};

const openaiImage = async (prompt) => {
  if (!OPENAI_KEY) throw new Error('OPENAI_API_KEY not set');
  const url = 'https://api.openai.com/v1/images/generations';
  const resp = await axios.post(url, {
    prompt,
    n: 1,
    size: "1024x512"
  }, { headers: { Authorization: `Bearer ${OPENAI_KEY}` }});
  return resp.data.data[0].url || null;
};

module.exports = { openaiText, openaiImage };
