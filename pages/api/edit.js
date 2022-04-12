import { prisma } from "src/lib/prisma";
import { authenticationMiddleware } from "src/lib/jwt";
import { runMiddleware } from "src/lib/middleware";
import { getAuthCookie, setAuthCookie } from "src/lib/cookie";
import { generateAccessToken } from "src/lib/jwt";

/**
 * This endpoint is used to fetch user's data from JWT token
 */
export default async function handler(req, res) {
  await runMiddleware(req, res, authenticationMiddleware);
  const token = getAuthCookie(req);
  const { id, username } = req.user;
  const { new_username } = req.body;

  if (!new_username) {
    return res.status(400).json({
      isSuccess: false,
      error: "Request must specify `new_username` entities in the body.",
    });
  }

  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: new_username
    },
  });

  let user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  const jwtToken = generateAccessToken(user.id, new_username);
  setAuthCookie(res, jwtToken);

  res.status(200).json({
    isSuccess: true,
    token: jwtToken,
    user,
  });
}
