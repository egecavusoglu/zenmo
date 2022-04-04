import { setAuthCookie } from "src/lib/cookie";
import { generateAccessToken } from "src/lib/jwt";
import { prisma } from "src/lib/prisma";
import { crypto } from "crypto";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { email } = req.body;

    // check if user exists
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // otherwise, create user
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email,
          username: email?.match(/^([^@]*)@/)[1],
          balance: 100,
          api_key: crypto.randomBytes(16).toString("hex"),
        },
      });
    }

    // set cookie and generate jwt for the user.
    const jwtToken = generateAccessToken(user.id, user.username);
    setAuthCookie(res, jwtToken);

    res.status(200).json({
      isSuccess: true,
      token: jwtToken,
      user,
    });
  }
}
