"use client";

export default function Home() {
  async function handleSubmit(e) {
    e.preventDefault();
    const prompt = e.target.prompt.value;

    const res = await fetch("http://localhost:3000/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "mysecret123"
      },
      body: JSON.stringify({
        prompt,
        note_id: "frontend-test"
      })
    });

    const data = await res.json();
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>BlogForge AI</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          name="prompt"
          placeholder="Write your blog prompt..."
          style={{ width: "400px", height: "120px", padding: "10px" }}
        ></textarea>
        <br />
        <button style={{ marginTop: "10px", padding: "10px 20px" }}>
          Generate Blog
        </button>
      </form>
    </div>
  );
}
