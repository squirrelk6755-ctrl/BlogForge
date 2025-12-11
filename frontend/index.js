import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'mysecret123';

  async function handlePublish(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API_URL}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          prompt: prompt,
          note_id: `frontend-${Date.now()}`
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ status: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 820, margin: '36px auto', padding: '0 16px' }}>
      <h1 style={{ marginBottom: 8 }}>BlogForge — Voice → AI → WordPress</h1>
      <p style={{ color: '#555' }}>Type the blog prompt and publish directly to WordPress via your BlogForge API.</p>

      <form onSubmit={handlePublish} style={{ marginTop: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Prompt</label>
        <textarea
          required
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
          placeholder="e.g. Write a friendly blog about how AI helps students in 2025..."
          style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', fontSize: 16 }}
        />

        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button type="submit" disabled={loading} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>
            {loading ? 'Publishing…' : 'Generate & Publish'}
          </button>
          <button type="button" onClick={() => setPrompt('')} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff' }}>
            Clear
          </button>
        </div>
      </form>

      <section style={{ marginTop: 24 }}>
        <h3>Result</h3>
        <pre style={{ background: '#f8fafc', padding: 12, borderRadius: 8 }}>
          {result ? JSON.stringify(result, null, 2) : 'No request made yet.'}
        </pre>
        {result && result.postUrl && (
          <div style={{ marginTop: 8 }}>
            <a href={result.postUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>Open published post</a>
          </div>
        )}
      </section>

      <footer style={{ marginTop: 36, color: '#777' }}>
        <small>Note: For local testing run backend and set NEXT_PUBLIC_API_URL to http://localhost:3000</small>
      </footer>
    </main>
  );
}
