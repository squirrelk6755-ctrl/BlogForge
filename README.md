BlogForge — AI-Powered Voice-to-WordPress Publishing Workflow
Team: Twin Byte

BlogForge is an AI-driven workflow that converts a user's voice note into a fully formatted, SEO-optimized WordPress blog post and publishes it automatically.
This project is built as a custom workflow for the SpeakSpace Annual Hackathon, enabling hands-free content creation using AI + automation.

🚀 1. Problem Statement

Content creators, students, bloggers, marketers, and journalists often record ideas as voice notes but later struggle to turn them into well-formatted articles.
They spend hours organizing content, structuring it, and manually publishing it.

SpeakSpace enables voice-to-intent extraction. BlogForge completes that workflow by turning voice into ready-to-publish WordPress content.

🌟 2. Solution Overview

BlogForge is a workflow API that:
1️⃣ Receives a prompt + extracted text from SpeakSpace
2️⃣ Uses OpenAI to transform the text into a clean, SEO-friendly blog post
3️⃣ Publishes the post to a WordPress site through WP REST API
4️⃣ Returns a simple success message and final blog URL to SpeakSpace

This turns raw audio notes into published content within seconds — zero manual intervention.

🏗 3. Tech Stack
Backend

Node.js

Express

OpenAI API

WordPress REST API

CORS

Render (Deployment)

Frontend

Next.js

Vercel (Deployment)

Data

JSON-based data store for saving generated posts

🔌 4. Live Deployment Links
Backend API (Render)
https://blogforge-backend.onrender.com

Frontend (Vercel)
https://blog-forge-one.vercel.app

📡 5. API Documentation
Endpoint:
POST /publish

URL:

https://blogforge-backend.onrender.com/publish


Headers:

Content-Type: application/json
x-api-key: mysecret123


Body Example (SpeakSpace will send this):

{
  "prompt": "Write an SEO blog about mental health.",
  "note_id": "abc123",
  "timestamp": "2025-12-11T14:00:00Z"
}


Success Response:

{
  "status": "success",
  "message": "Workflow executed",
  "postUrl": "http://yourwordpresssite.com/blog/the-post-url"
}

🔒 6. Authorization Details

BlogForge uses simple API Key authentication.

Header

x-api-key: mysecret123


Include this key in your SpeakSpace action configuration.

⚙ 7. Environment Variables

Create a .env file (not included in ZIP).
Judges will use .env.example.

OPENAI_API_KEY=your_openai_key
WP_BASE_URL=http://blogforge-local.local
WP_USERNAME=admin
WP_APP_PASSWORD=your_wp_app_password
API_KEY=mysecret123
DATA_FILE=./data/posts.json
PORT=10000

📄 8. .env.example (included in project)
OPENAI_API_KEY=your_openai_key_here
WP_BASE_URL=http://your-wp-url-here
WP_USERNAME=admin
WP_APP_PASSWORD=xxxxxxx
API_KEY=mysecret123
DATA_FILE=./data/posts.json
PORT=10000

🛠 9. Setup Instructions (Local Run)
Backend
npm install
npm start


Runs at:

http://localhost:10000

Frontend
cd frontend
npm install
npm run dev


Runs at:

http://localhost:3000

☁ 10. Deployment Guide
Backend (Render)

Build command:

npm install


Start command:

npm start


Environment variables added manually.

Frontend (Vercel)

Root directory:

frontend


Build command:

npm install && npm run build


Environment variables:

NEXT_PUBLIC_API_URL=https://blogforge-backend.onrender.com
NEXT_PUBLIC_API_KEY=mysecret123

🎙 11. SpeakSpace Action Configuration (Copy-Paste Ready)
Title:
Publish to WordPress

Description:
Converts your voice note into a fully formatted blog post and publishes it automatically.

Prompt Template:
Generate an SEO-optimized, well-structured WordPress blog post from this text: $PROMPT

API URL:
https://blogforge-backend.onrender.com/publish

Method:
POST

Headers:
Content-Type: application/json
x-api-key: mysecret123

Body:
{
  "prompt": "$PROMPT",
  "note_id": "$NOTE_ID"
}
