import { prisma } from "src/lib/prisma";
import { authenticationMiddleware } from "src/lib/jwt";
import { runMiddleware } from "src/lib/middleware";
import { getAuthCookie } from "src/lib/cookie";

/**
 * This endpoint is used to fetch user's data from JWT token
 */
export default async function handler(req, res) {
  await runMiddleware(req, res, authenticationMiddleware);
  const token = getAuthCookie(req);
  const { id, username } = req.user;

  res.status(200).json({
    isSuccess: true,
    token,
    user: {
      id,
      username,
    },
  });
}
