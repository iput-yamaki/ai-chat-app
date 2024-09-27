// /app/api/chat/route.ts
import { NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('OpenAI API key is not defined in environment variables');
}

export async function POST(request: Request) {
    try {
      const { prompt } = await request.json();
  
      if (!prompt || typeof prompt !== 'string') {
        return NextResponse.json({ message: 'Invalid prompt' }, { status: 400 });
      }
  
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'あなたは役に立つアシスタントです。' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 100,
        }),
      });
  
      const data = await response.json();
      console.log('OpenAI API Response:', data); // レスポンスをログに出力
  
      if (response.ok && data.choices && data.choices.length > 0) {
        return NextResponse.json({ response: data.choices[0].message.content.trim() });
      } else {
        return NextResponse.json({ message: 'Failed to fetch response from OpenAI' }, { status: 500 });
      }
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error);
      return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
  }
  