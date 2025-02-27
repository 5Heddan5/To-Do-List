import { useState, useEffect } from "react";
import useForm from "./UseForm";

export function Form() {
  const { task, handleChange, handleSubmit } = useForm();
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:3000/tasks");
    const data = await response.json();
    console.log("Fetched tasks from backend:", data); // Debugging log to check fetched tasks
    setTasks(data);
  };

  const handleFormSubmit = async (event) => {
    await handleSubmit(event); // Add the task to the database
    fetchTasks(); // Fetch updated tasks after adding
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
    fetchTasks(); // Refresh the task list after deletion
  };

  return (
    <div className="form-content">
      <h2>To-Do-List</h2>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          name="thing"
          type="text"
          placeholder="What is the task today?"
          value={task.thing} // Bind input to task.thing
          onChange={handleChange}
        />
        <button type="submit" className="submit-button">
          Add Task
        </button>
      </form>
      <div className="tasks">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              {task.thing}{" "}
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
}
