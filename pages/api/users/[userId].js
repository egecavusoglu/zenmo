import { prisma } from "src/lib/prisma";
import { authenticationMiddleware } from "src/lib/jwt";
import { runMiddleware } from "src/lib/middleware";
import { getAuthCookie } from "src/lib/cookie";
import { Vulnerabilities } from "@prisma/client";

/**
 * This endpoint is used to fetch user's profile data.
 */
export default async function handler(req, res) {
  if (req.method == "GET") {
    await runMiddleware(req, res, authenticationMiddleware);
    const token = getAuthCookie(req);
    const { id, username } = req.user;

    let { userId } = req.query;
    userId = parseInt(userId);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (id != userId) {
      // means the user is accessing some other profile via API, give credit for the task
      await prisma.task.upsert({
        where: {
          vulnerability_userId: {
            userId: id,
            vulnerability: Vulnerabilities.UNPROTECTED_ROUTE,
          },
        },
        update: {},
        create: {
          vulnerability: Vulnerabilities.UNPROTECTED_ROUTE,
          userId: id,
        },
      });
    }

    res.status(200).json({
      isSuccess: true,
      token,
      user,
    });
  }
}
