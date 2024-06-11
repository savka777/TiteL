import { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '@/lib/openai';
import { db } from '@/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { articleText, articleType, userId } = req.body;

  if (!articleText) {
    return res.status(400).json({ message: 'Article text is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are an SEO expert. Create an SEO optimized title for the provided ${articleType} that includes relevant keywords, is concise, and engaging for readers. Ensure the title is within 60 characters and effectively summarizes the main topic of the article.`,
        },
        { role: 'user', content: articleText },
      ],
      max_tokens: 100,
    });

    console.log('API Response:', response);

    let generatedTitle = response.choices[0]?.message?.content?.trim();
    console.log('Generated Title:', generatedTitle);

    if (!generatedTitle) {
      return res.status(500).json({ message: 'Failed to generate title' });
    }

    // Remove any leading or trailing quotation marks from the generated title
    generatedTitle = generatedTitle.replace(/^["']|["']$/g, '');

    // Print the user ID to the console
    console.log('User ID:', userId);

    // Update the user's token balance in the database
    if (userId) {
      const user = await db.user.findUnique({ where: { id: userId } });
      if (user) {
        const newTokenBalance = user.tokenBalance - 1;
        await db.user.update({
          where: { id: userId },
          data: { tokenBalance: newTokenBalance },
        });
      }
    }

    return res.status(200).json({ title: generatedTitle });
  } catch (error) {
    console.error('Error generating title:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
