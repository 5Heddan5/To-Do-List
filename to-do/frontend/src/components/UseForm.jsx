import { useState } from "react";

const useForm = () => {
  const [task, setTask] = useState({
    thing: "",
  });

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("task:", task.thing);

    // Send the task to the backend
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      console.log("Task added to database!");
    } else {
      console.error("Error adding task");
    }

    setTask({ thing: "" }); // Clear the input field after submission
  };

  return {
    task,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
