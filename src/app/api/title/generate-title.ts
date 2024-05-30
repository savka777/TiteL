import { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '@/lib/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { articleText } = req.body;

  if (!articleText) {
    return res.status(400).json({ message: 'Article text is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Generate an SEO-friendly title for the following article text:' },
        { role: 'user', content: articleText }
      ],
      max_tokens: 50,
    });

    console.log('API Response:', response); // Log the entire response

    const generatedTitle = response.choices[0]?.message?.content?.trim();
    console.log('Generated Title:', generatedTitle); // Log the generated title

    if (!generatedTitle) {
      return res.status(500).json({ message: 'Failed to generate title' });
    }

    return res.status(200).json({ title: generatedTitle });
  } catch (error) {
    console.error('Error generating title:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
