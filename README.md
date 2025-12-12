BlogForge — AI-Powered Voice-to-WordPress Publishing Workflow
Team: Twin Byte

BlogForge is an AI-driven workflow that converts a user's voice note (processed by SpeakSpace into text) into a fully formatted, SEO-optimized WordPress blog post and publishes it automatically.
This project is built for the SpeakSpace Annual Hackathon, enabling hands-free content creation using AI + automation.

 1. Problem Statement

Creators, students, bloggers, marketers—even journalists—record ideas as voice notes.
But later, they struggle to convert those raw thoughts into structured, publish-ready articles.

Although SpeakSpace extracts text from voice notes, users still need a workflow that:

Organizes the content

Adds structure & SEO

Publishes to WordPress automatically

BlogForge completes this missing step.

 2. Solution Overview

BlogForge acts as a workflow API between SpeakSpace and WordPress.

It performs 4 main actions:

a. Receives the prompt + extracted text from SpeakSpace
b. Uses OpenAI to generate an SEO-optimized blog post (title, meta description, markdown)
c. Publishes the post to WordPress via REST API
d. Returns a simple success response + final post URL

This allows users to go from Voice → Text → Published Blog in just seconds.

 3. Tech Stack
Backend

Node.js

Express

OpenAI API

WordPress REST API

CORS

Render (deployment)

Frontend

Next.js 14

Vercel (deployment)

Data

JSON-based storage for generated post logs

 4. Live Deployment Links
Backend (Render)

https://blogforge-backend.onrender.com

Frontend (Vercel)

https://blog-forge-one.vercel.app

 5. API Documentation
Endpoint:

POST /publish

URL:

https://blogforge-backend.onrender.com/publish

Headers:
Content-Type: application/json
x-api-key: mysecret123

Example Body (SpeakSpace sends this):
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

 6. Authorization Details

BlogForge uses a simple static API key.

Header:
x-api-key: mysecret123


This must be added to your SpeakSpace workflow configuration.

 7. Environment Variables

Your .env file (NOT included in ZIP) should look like:

OPENAI_API_KEY=your_openai_key
WP_BASE_URL=http://blogforge-local.local
WP_USERNAME=admin
WP_APP_PASSWORD=your_wp_app_password
API_KEY=mysecret123
DATA_FILE=./data/posts.json
PORT=10000
 8. .env.example (Included in Project)
OPENAI_API_KEY=your_openai_key_here
WP_BASE_URL=http://your-wp-url-here
WP_USERNAME=admin
WP_APP_PASSWORD=xxxxxxx
API_KEY=mysecret123
DATA_FILE=./data/posts.json
PORT=10000

 9. Setup Instructions (Local Development)
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

 10. Deployment Guide
Backend (Render)

Build Command:

npm install


Start Command:

npm start


Environment variables added in Render dashboard.

Frontend (Vercel)

Root Directory:

frontend


Build Command:

npm install && npm run build


Environment Variables:

NEXT_PUBLIC_API_URL=https://blogforge-backend.onrender.com
NEXT_PUBLIC_API_KEY=mysecret123

 11. SpeakSpace Action Configuration (Copy-Paste Ready)

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
