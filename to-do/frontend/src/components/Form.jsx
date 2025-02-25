import useForm from "./UseForm";

export function Form() {
  const { task, handleChange, handleSubmit } = useForm();

  return (
    <div className="form-content">
      <h2>To-Do-List</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          name="thing"
          type="text"
          placeholder="What is the task today?"
          value={task.thing} // Bind input to task.thing
          onChange={handleChange} // Handle changes to input
        />
        <button type="submit" className="submit-button">
          Add Task
        </button>
      </form>
    </div>
  );
}
