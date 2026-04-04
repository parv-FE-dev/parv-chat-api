# Parv Chat API

Backend API for the **Ask Parv** AI chatbot on [parvsaxena.com](https://parvsaxena.com).

## Architecture

4-layer caching system for fast, cost-efficient responses:

1. **FAQ Cache** — Instant keyword-matched answers for common questions
2. **Fuzzy Match** — Weighted keyword scoring for partial matches
3. **Response Cache** — In-memory cache (7-day TTL, 500 entries) for previously asked questions
4. **Claude Haiku** — Anthropic Claude AI for novel questions, with full context about Parv

## API

### `POST /api/chat`

**Request:**
```json
{ "message": "Tell me about Parv's experience" }
```

**Response:**
```json
{
  "response": "Parv has 5+ years of experience...",
  "source": "faq" | "cache" | "ai" | "fallback"
}
```

## Setup

```bash
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

## Tech Stack

- Next.js (App Router)
- TypeScript
- Anthropic Claude Haiku
