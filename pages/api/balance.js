import { prisma } from "src/lib/prisma";
import { authenticationMiddleware } from "src/lib/jwt";
import { runMiddleware } from "src/lib/middleware";
import { getAuthCookie } from "src/lib/cookie";
import { Vulnerabilities } from "@prisma/client";
import { TASK_COMPLETED_STATUS } from "src/lib/fetch";

/**
 * This endpoint is used to fetch user's profile data.
 */
export default async function handler(req, res) {
  if (req.method == "GET") {
    await runMiddleware(req, res, authenticationMiddleware);
    const token = getAuthCookie(req);
    let { id, username } = req.user;

    id = parseInt(id);

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      isSuccess: true,
      token,
      balance: user?.balance,
    });
  }
}
