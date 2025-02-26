import { useState } from "react";

const useForm = () => {
  const [task, setTask] = useState({ thing: "" });

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting task:", task.thing); // Debugging log

    try {
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

      setTask({ thing: "" }); // Clear input field
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return { task, handleChange, handleSubmit };
};

export default useForm;
