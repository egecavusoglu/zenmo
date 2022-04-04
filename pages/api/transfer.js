import { prisma } from "src/lib/prisma";
import { authenticationMiddleware } from "src/lib/jwt";
import { runMiddleware } from "src/lib/middleware";
/**
 * This endpoint is used to transfer money from one user to another.
 */

export default async function handler(req, res) {
  if (req.method == "POST") {
    await runMiddleware(req, res, authenticationMiddleware);
    const { id, username } = req.user;
    const { from, to, amount } = req.body;

    if (!from || !to) {
      return res.status(400).json({
        isSuccess: false,
        error: "Request must specify `from` and `to` entities in the body.",
      });
    }

    if (isNaN(amount)) {
      return res.status(400).json({
        isSuccess: false,
        error: "amount must be a number",
      });
    }

    const parsedAmount = parseFloat(amount);

    let toUser;
    let fromUser;
    await prisma.$transaction(async (prisma) => {
      const fromDbUser = await prisma.user.findUnique({
        where: {
          username: from,
        },
      });

      if (fromDbUser.balance < parsedAmount) {
        throw new Error(
          `${from} does not have ${parsedAmount} amount of funds to transfer!`
        );
      }

      fromUser = await prisma.user.update({
        where: {
          username: from,
        },
        data: {
          balance: {
            decrement: parsedAmount,
          },
        },
      });

      toUser = await prisma.user.update({
        where: {
          username: to,
        },
        data: {
          balance: {
            increment: parsedAmount,
          },
        },
      });
    });

    res.status(200).json({
      isSuccess: true,
      token: { fromUser, toUser },
    });
  }
}
