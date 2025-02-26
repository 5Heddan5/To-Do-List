import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import path from "path";

// Ensure you're using the correct database file
const dbFilePath = path.resolve("./todo.db");
console.log("Database file path:", dbFilePath); // Debugging log to check file path

const db = new Database(dbFilePath); // Connect to the correct database
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
  console.log("Fetching tasks:", tasks); // Debugging log to check tasks being fetched
  res.json(tasks);
});

// Route to add a task
app.post("/tasks", (req, res) => {
  const { thing } = req.body;
  if (!thing) {
    return res.status(400).json({ error: "Task is required" });
  }

  // Insert the task into the database
  const stmt = db.prepare("INSERT INTO tasks (thing) VALUES (?)");
  const result = stmt.run(thing);

  console.log("Inserted Task:", thing, "ID:", result.lastInsertRowid); // Debugging log to check insertion

  res.status(201).json({ id: result.lastInsertRowid, thing });
});

// Route to delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  console.log("Deleted Task ID:", id); // Debugging log to check task deletion
  res.status(200).json({ message: "Task deleted successfully!" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
