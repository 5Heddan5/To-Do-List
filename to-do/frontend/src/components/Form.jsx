import { useState } from "react";
import useForm from "./UseForm";

export function Form() {
  const { task, handleChange, handleSubmit } = useForm();
  const [tasks, setTasks] = useState([]);

  const handleFormSubmit = async (event) => {
    await handleSubmit(event); // Add the task to the database
    fetchTasks(); // Fetch updated tasks
  };

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:3000/tasks"); // API endpoint
    const data = await response.json();
    setTasks(data); // Update the tasks state with data from the server
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
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.thing}</li>
        ))}
      </ul>
    </div>
  );
}
