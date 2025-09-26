import express from "express";
import { readJSON, writeJSON } from "../ftpClient.js";
import { authMiddleware } from "../auth.js";
const router = express.Router();

const TOURNAMENTS_PATH = process.env.TOURNAMENTS_PATH || "/tarot/data/tournaments.json";

router.get("/", async (req, res) => {
  try {
    const list = await readJSON(TOURNAMENTS_PATH);
    res.json(list || []);
  } catch {
    res.status(500).json({ error: "read error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const list = (await readJSON(TOURNAMENTS_PATH)) || [];
    list.push(req.body);
    await writeJSON(TOURNAMENTS_PATH, list);
    res.status(201).json(req.body);
  } catch {
    res.status(500).json({ error: "write error" });
  }
});

export default router;