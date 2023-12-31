import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function likeHandler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    console.log('Reached the /api/like endpoint');
  
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

    let updatedLikedIds = [...(post.likedIds || [])];

    if (req.method === 'POST') {
      updatedLikedIds.push(currentUser.id);

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId
          }
        })

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: 'Someone voted on an answer!',
              userId: post.userId
            }
          });

          await prisma.user.update({
            where: {
              id: post.userId
            },
            data: {
              hasNotification: true
            }
          })
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (req.method === 'DELETE') {
      updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser.id)
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    console.log('Updated post:', updatedPost);

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
