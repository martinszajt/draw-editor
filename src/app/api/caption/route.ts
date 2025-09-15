import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { imageBase64 } = await req.json();

  const response = await fetch(
    'https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: imageBase64,
      }),
    }
  );

  const result = await response.json();
  return NextResponse.json(result);
}
