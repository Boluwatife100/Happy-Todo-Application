import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());

app.use((req, res, next) => {
  if (!req.body) {
    req.body = {};
  }
  next();
});

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, (req, res) => {
  console.log(`The server has started: ${PORT}`);
});
