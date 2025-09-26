import express from "express";
import { readJSON, writeJSON } from "../ftpClient.js";
import { authMiddleware } from "../auth.js";
const router = express.Router();

router.get("/:id", async (req, res) => {
  const path = `/tarot/data/${req.params.id}/results.json`;
  try {
    const data = await readJSON(path);
    res.json(data || {});
  } catch {
    res.status(500).json({ error: "read error" });
  }
});

router.post("/:id", authMiddleware, async (req, res) => {
  const path = `/tarot/data/${req.params.id}/results.json`;
  try {
    await writeJSON(path, req.body);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "write error" });
  }
});

export default router;