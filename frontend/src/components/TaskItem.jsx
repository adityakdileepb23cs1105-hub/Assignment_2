import { useState } from "react";

// One task row: checkbox, title (editable), delete button
export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const saveEdit = async () => {
    if (draft.trim() && draft.trim() !== task.title) {
      const ok = await onUpdate(task._id, { title: draft });
      if (!ok) setDraft(task.title);
    } else {
      setDraft(task.title);
    }
    setEditing(false);
  };

  return (
    <li className={task.completed ? "task done" : "task"}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onUpdate(task._id, { completed: !task.completed })}
        aria-label={`Mark "${task.title}" as ${task.completed ? "not done" : "done"}`}
      />

      {editing ? (
        <input
          className="edit-input"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") { setDraft(task.title); setEditing(false); }
          }}
        />
      ) : (
        <span className="title" onDoubleClick={() => setEditing(true)} title="Double-click to edit">
          {task.title}
        </span>
      )}

      <button className="ghost" onClick={() => setEditing(true)} aria-label="Edit task">Edit</button>
      <button className="ghost danger" onClick={() => onDelete(task._id)} aria-label="Delete task">Delete</button>
    </li>
  );
}
