import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const API = "http://localhost:5000/api/tasks";

  // GET
  const getTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  // ADD
  const addTask = async () => {
    if (!task) return;

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });

    const data = await res.json();
    setTasks(data);
    setTask("");
  };

  // COMPLETE
  const completeTask = async (id) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "done" }),
    });

    const data = await res.json();
    setTasks(data);
  };

  // FAIL
  const failTask = async (id) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "fail" }),
    });

    const data = await res.json();
    setTasks(data);
  };

  // DELETE
  const deleteTask = async (id) => {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    setTasks(data);
  };

  return (
    <div className="app-wrapper">

      {/* HEADER */}
      <div className="top-header">
        ITS FREDRICK'S FIRST PROJECT OF FULL STACK
      </div>

      <div className="app">
        <div className="card">

          <h1 className="todo-title">✨ Todo App</h1>

          <div className="inputBox">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task..."
            />

            <button onClick={addTask}>➕ Add</button>
          </div>

          <ul>
            {tasks.map((t) => (
              <li key={t._id} className={t.status}>

                <span>{t.task}</span>

                <div className="actions">
                  <button className="ok" onClick={() => completeTask(t._id)}>✓</button>
                  <button className="no" onClick={() => failTask(t._id)}>✗</button>
                  <button className="del" onClick={() => deleteTask(t._id)}>🗑</button>
                </div>

              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default App;