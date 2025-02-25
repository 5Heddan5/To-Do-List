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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("task:", task.thing); // Log only the task value (thing)
  };

  return {
    task,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
