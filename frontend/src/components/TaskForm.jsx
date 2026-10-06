import { useState } from "react";

// Form to add a new task
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const ok = await onAdd(title);
    if (ok) setTitle(""); // clear the input after a successful add
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        aria-label="New task"
      />
      <button type="submit">Add task</button>
    </form>
  );
}
