import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { question } = req.body;

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: question,
        max_tokens: 100,
        stream: true,
      }),
    });

    const data = await response.json();
    res.status(200).json({ answer: data.choices[0].text.trim() });
  } else {
    res.status(405).end();
  }
}
