import express from "express";
import Database from "better-sqlite3";
import cors from "cors";

const app = express();
const db = new Database("todolist.db");

app.use(express.json());
app.use(cors());

db.exec(`
  CREATE TABLE IF NOT EXISTS task (
    taskId INTEGER PRIMARY KEY AUTOINCREMENT,
    taskName TEXT NOT NULL,
    taskDescription TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`);

// Hämtar alla aktivitet
app.get("/api/task/get", (req, res) =>{
const query = db.prepare("SELECT * FROM task");
const tasks = query.all();
res.json(tasks);
});

// Lägger till en ny aktivitet
app.post("/api/taks/add", (req, res) => {
  const { taskName, taskDescription } = req.body;
  if (!taskName || !taskDescription) {
    return res.status(400).json({ error: "Missing todoName or todoDescription" });
  }
  const query  = db.prepare("INSERT INTO task (taskName, taskDescription) VALUES (?, ?)");

  const result = query.run(taskName, taskDescription);
  res.status(201).json({ message: "Task added", id: result.lastInsertRowid})
  });

  // Uppdaterar en aktivitet baserat på id
  app.put("/api/task/update/:id", (req, res) => {
    const { completed } = req.body;
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Missing id"});

    const query = db.prepare("UPDATE task SET completed = ? where taskId = ?");
    query.run(completed ? 1 : 0, id);
    res.json({ message: "Task updated"});
    })

    // Tar bort en aktivitet baserat på id
    app.delete("/api/task/delete/:id", (req, res) => {
      const { id } = req.params; 
      const query = db.prepare("DELETE FROM task WHERE taskId = ?");
      const result = query.run(id);

      if (result.changes === 0) return res.status(404).json({ message: "Task not found"});

      res.json({ message: "Task deleted"});
    })

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
