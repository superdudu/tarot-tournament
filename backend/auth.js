import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = process.env.JWT_SECRET || "supersecret";

export function generateToken(user) {
  return jwt.sign({ username: user.username, role: user.role }, SECRET, {
    expiresIn: "8h"
  });
}

export function authMiddleware(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.sendStatus(401);
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
}

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}