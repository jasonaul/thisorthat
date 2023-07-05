import { NextApiRequest, NextApiResponse } from "next";

declare function likeHandlerTwo(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void>;

export default likeHandlerTwo;
