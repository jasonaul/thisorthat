import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function likeHandlerTwo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Reached the /api/likeTwo endpoint');

  if (req.method !== 'POST' && req.method !== 'DELETE') {
    console.log('Invalid request method:', req.method);
    return res.status(405).end();
  }

  try {
    const postId = req.method === 'POST' ? req.body.postId : req.query.postId;

    console.log('Post ID:', postId);

    const { currentUser } = await serverAuth(req, res);

    console.log('Current user:', currentUser);

    if (!postId || typeof postId !== 'string') {
      console.log('Invalid ID:', postId);
      throw new Error('Invalid ID');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    console.log('Post:', post);

    if (!post) {
      console.log('Post not found');
      throw new Error('Invalid ID');
    }

    let updatedLikedIdsTwo = [...(post.likedIdsTwo || [])];

    if (req.method === 'POST') {
      updatedLikedIdsTwo.push(currentUser.id)
    }

    if (req.method === 'DELETE') {
      updatedLikedIdsTwo = updatedLikedIdsTwo.filter((likedId) => likedId !== currentUser.id)
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIdsTwo: updatedLikedIdsTwo,
      },
    });

    console.log('Updated post:', updatedPost);

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
