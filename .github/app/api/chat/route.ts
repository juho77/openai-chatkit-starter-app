// app/api/chat/route.ts
import { NextRequest } from 'next/server';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export const runtime = 'edge';

// Sanity check GET -> te permet de vérifier que la route existe
export async function GET() {
  return new Response('ok');
}

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // définie sur Vercel
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai(process.env.MODEL ?? 'gpt-4.1-mini'),
    messages,          // [{ role: 'user'|'assistant'|'system', content }]
    temperature: 0.2,
  });

  return result.toAIStreamResponse(); // streaming SSE
}
