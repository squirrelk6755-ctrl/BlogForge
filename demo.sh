#!/usr/bin/env bash

URL="http://localhost:3000/publish"
API_KEY="change_this_secret_key"

curl -X POST "$URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "prompt": "Create a friendly blog post about how electric scooters are changing urban mobility. Include 5 bullet points, SEO title and meta.",
    "note_id": "demo-note-1",
    "timestamp": "'"$(date -Iseconds)"'"
  }'
