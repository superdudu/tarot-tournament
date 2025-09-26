import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import tournamentsRouter from "./routes/tournaments.js";
import resultsRouter from "./routes/results.js";
import usersRouter from "./routes/users.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/tournaments", tournamentsRouter);
app.use("/api/results", resultsRouter);
app.use("/api/users", usersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend listening on ${port}`));