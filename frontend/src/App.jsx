import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { getTasks, createTask, updateTask, deleteTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tasks once, when the page loads
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError("Can't reach the server. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  // Add: POST, then append the saved task to state
  const handleAdd = async (title) => {
    try {
      const task = await createTask(title);
      setTasks((prev) => [...prev, task]);
      setError("");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Update (complete toggle or title edit): PUT, then replace the task in state
  const handleUpdate = async (id, changes) => {
    try {
      const updated = await updateTask(id, changes);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      setError("");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Delete: DELETE, then remove the task from state
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const doneCount = tasks.filter((t) => t.completed).length;

  return (
    <main className="app">
      <header className="masthead">
        <h1>To-Do List</h1>
        <p className="tally">
          {tasks.length === 0 ? "Nothing to do yet" : `${doneCount} of ${tasks.length} done`}
        </p>
      </header>

      <TaskForm onAdd={handleAdd} />

      {error && <p className="error" role="alert">{error}</p>}

      {loading ? (
        <p className="muted">Loading tasks…</p>
      ) : (
        <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}
    </main>
  );
}
