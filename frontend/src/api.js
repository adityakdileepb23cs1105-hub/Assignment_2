// All calls to the backend live here (fetch wrappers)
const BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api/tasks";

// Parse the response; throw an Error with the server's message on failure
async function handle(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const getTasks = () => fetch(BASE).then(handle);

export const createTask = (title) =>
  fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then(handle);

export const updateTask = (id, changes) =>
  fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  }).then(handle);

export const deleteTask = (id) =>
  fetch(`${BASE}/${id}`, { method: "DELETE" }).then(handle);
