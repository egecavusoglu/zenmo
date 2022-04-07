import jwt from "jsonwebtoken";
import { getAuthCookie } from "../cookie";
// import dotenv from 'dotenv';
// dotenv.config();

const JWT_TOKEN_SECRET = process.env.TOKEN_SECRET;

/**
 *
 * @param {*} userId
 * @returns User ID encrypted JWT token
 */
function generateAccessToken(userId, username) {
  return jwt.sign({ id: userId, username: username }, JWT_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

/**
 * @function authenticationMiddleware extracts auth-token from incoming request 'auth-token' cookie and sets req.user to the data decrypted from jwt token.
 * @returns void
 */
function authenticationMiddleware(req, res, next) {
  const header = getAuthCookie(req);
  const token = header && header.split(" ")[1];
  if (!token) {
    return res.status(401);
  }
  jwt.verify(token, JWT_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401);
    }
    req.user = user;
    next();
  });
}

/**
 * @function checkValidAuthCookie
 * @returns void
 */
function checkValidAuthCookie(req) {
  const header = getAuthCookie(req);
  const token = header && header.split(" ")[1];
  if (!token) {
    return false;
  }
  return jwt.verify(token, JWT_TOKEN_SECRET, (err, user) => {
    if (err) {
      return false;
    }
    return true;
  });
}

export { generateAccessToken, authenticationMiddleware, checkValidAuthCookie };
