import { prisma } from "src/lib/prisma";
import { authenticationMiddleware } from "src/lib/jwt";
import { runMiddleware } from "src/lib/middleware";
import { getAuthCookie } from "src/lib/cookie";
import { Vulnerabilities } from "@prisma/client";

/**
 * This endpoint is used to fetch user's progress
 */
export default async function handler(req, res) {
  await runMiddleware(req, res, authenticationMiddleware);
  const token = getAuthCookie(req);
  const { id, username } = req.user;

  const vulnerabilities = await prisma.task.groupBy({
    by: ["vulnerability"],
    where: {
      userId: id,
    },
  });

  const vulnerabilitiesLength = vulnerabilities.length;
  const percentFinished = (vulnerabilitiesLength / 4) * 100;

  res.status(200).json({
    isSuccess: true,
    token,
    data: {
      tasks: vulnerabilities,
      percentFinished,
    },
  });
}
