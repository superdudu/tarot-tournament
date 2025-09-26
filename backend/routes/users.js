import express from "express";
import { generateToken, comparePassword } from "../auth.js";
import { readJSON } from "../ftpClient.js";

const router = express.Router();
const USERS_PATH = process.env.USERS_PATH || "/tarot/data/users.json";

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = await readJSON(USERS_PATH);
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: "invalid" });
  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "invalid" });
  const token = generateToken(user);
  res.json({ token });
});

export default router;