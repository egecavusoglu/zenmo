import { resetAuthCookie } from "src/lib/cookie";

/**
 * @endpoint /logout
 * Logs out the user by clearing the httpOnly token cookie.
 * @post
 */

export default async function handler(req, res) {
  if (req.method == "POST") {
    // Generate JWT access token
    resetAuthCookie(res);
    res.status(200).json({ isSuccess: true });
  }
}
