// src/TodoApp.jsx
import React, { useState } from "react";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = task.trim();
    if (!text) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), text, completed: false },
    ]);
    setTask("");
  };

  const toggleTodo = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const deleteTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

  return (
    <div>
      <h2>Todo List</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          aria-label="task-input"
        />
        <button type="submit">Add</button>
      </form>

      {todos.length === 0 ? (
        <p>No todos yet — add one above.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                onClick={() => toggleTodo(todo.id)}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                {todo.text}
              </span>
              {" "}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
