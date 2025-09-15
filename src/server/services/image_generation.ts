import OpenAI from 'openai';
const openai = new OpenAI();

export const flux_nebius_generation = async (prompt: string) => {
  // not used due limited free rate on model
  const res = await fetch('https://router.huggingface.co/nebius/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      response_format: 'b64_json',
      prompt: `"400 x 400 digital art of ${prompt}"`,
      model: 'black-forest-labs/flux-dev',
    }),
  });
  const result = await res.json();
  console.log(result.data[0].url);
  return result.data[0].b64_json;
};

export const open_ai_generation = async (prompt: string) => {
  const result = await openai.images.generate({
    model: 'dall-e-2',
    prompt: `digital art of ${prompt}`,
    size: '256x256',
  });

  console.log('result', result);
  const image_base64 = result?.data && result.data[0].url;
  return image_base64;
};
