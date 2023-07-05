import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    return res.status(200).json(currentUser);
  } catch (error: any) {
    console.log(error);
    if (error?.message === 'Not signed in') {
      return res.status(401).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}
