// Vercel serverless function: proxies chatbot messages to Cohere so the
// API key stays on the server. The Flutter app POSTs { "message": "..." }
// and receives { "text": "..." }.

const COHERE_URL = 'https://api.cohere.ai/v1/generate';
const MAX_MESSAGE_LENGTH = 1000;

// Optional comma-separated list of extra origins allowed to call this endpoint
// from a browser (e.g. http://localhost:8080 during local Flutter development).
// Same-origin requests from the deployed site and mobile apps need no entry.
function applyCors(req, res) {
  const allowed = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  const origin = req.headers.origin;
  if (origin && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

function buildPrompt(message) {
  return `You are a helpful nutrition expert assistant. Provide accurate, helpful information about food ingredients, nutrition, and healthy eating. Keep responses concise and friendly.\n\nUser: ${message}\n\nNutrition Expert:`;
}

async function handler(req, res) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    console.error('COHERE_API_KEY is not configured');
    return res.status(500).json({ error: 'Chat service is not configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = null;
    }
  }
  const message = body && typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(413).json({ error: `message must be at most ${MAX_MESSAGE_LENGTH} characters` });
  }

  try {
    const response = await fetch(COHERE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'command-light',
        prompt: buildPrompt(message),
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error(`Cohere request failed with status ${response.status}`);
      return res.status(502).json({ error: 'Failed to get response from Cohere' });
    }

    const data = await response.json();
    const text = data?.generations?.[0]?.text;
    if (typeof text !== 'string') {
      console.error('Unexpected Cohere response shape');
      return res.status(502).json({ error: 'Failed to get response from Cohere' });
    }

    return res.status(200).json({ text: text.trim() });
  } catch (err) {
    console.error('Cohere request error:', err.message);
    return res.status(502).json({ error: 'Failed to get response from Cohere' });
  }
}

module.exports = handler;
