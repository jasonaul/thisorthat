import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import likeHandler from "../like";
import likeHandlerTwo from "../likeTwo";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { postId } = req.query;

      if (!postId || typeof postId !== "string") {
        throw new Error("Invalid ID");
      }

      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              created: "desc",
            },
          },
        },
      });

      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
      return res.status(400).end();
    }
  } else if (req.method === "POST" || req.method === "DELETE") {
    if (req.url?.includes("likeTwo")) {
      // Delegate likeTwo-related operations to likeHandlerTwo
      await likeHandlerTwo(req, res);
    } else {
      // Delegate like-related operations to likeHandler
      await likeHandler(req, res);
    }
  } else {
    return res.status(405).end();
  }
}
