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
  let { email } = req.query;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).json({
      isSuccess: false,
      error: "User not found!",
    });
  }

  const id = user.id;

  await prisma.task.upsert({
    where: {
      vulnerability_userId: {
        userId: id,
        vulnerability: Vulnerabilities.XSS_ATTACK,
      },
    },
    update: {},
    create: {
      vulnerability: Vulnerabilities.XSS_ATTACK,
      userId: id,
    },
  });

  res.status(200).json({
    isSuccess: true,
  });
}
