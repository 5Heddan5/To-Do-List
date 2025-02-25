import express from "express";
import Database from "better-sqlite3";
import cors from "cors";

const db = new Database("./todo.db");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Create a "tasks" table if it doesn't exist
db.prepare(
  `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    thing TEXT NOT NULL
  )`
).run();

// Route to get all tasks
app.get("/tasks", (req, res) => {
  const tasks = db.prepare("SELECT * FROM tasks").all();
  res.json(tasks);
});

// Route to add a task
app.post("/tasks", (req, res) => {
  const { thing } = req.body;
  if (!thing) {
    return res.status(400).json({ error: "Task is required" });
  }

  const stmt = db.prepare("INSERT INTO tasks (thing) VALUES (?)");
  stmt.run(thing);

  res.status(201).json({ message: "Task added successfully!" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
eafaef
