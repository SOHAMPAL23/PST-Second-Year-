import React, { useState, useEffect, useRef } from "react";

export default function Todo() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem("todos_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [newText, setNewText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("todos_v1", JSON.stringify(todos));
  }, [todos]);

  // simple unique id
  const uid = () =>
    Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  function addTodo() {
    const text = newText.trim();
    if (!text) return;
    setTodos((t) => [
      ...t,
      { id: uid(), text, completed: false, createdAt: Date.now() },
    ]);
    setNewText("");
    inputRef.current?.focus();
  }

  function removeTodo(id) {
    setTodos((t) => t.filter((x) => x.id !== id));
  }

  function toggleTodo(id) {
    setTodos((t) =>
      t.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x))
    );
  }

  function startEdit(id) {
    const item = todos.find((x) => x.id === id);
    if (!item) return;
    setEditingId(id);
    setEditingText(item.text);
  }

  function commitEdit() {
    const text = editingText.trim();
    if (!text) {
      removeTodo(editingId);
    } else {
      setTodos((t) =>
        t.map((x) => (x.id === editingId ? { ...x, text } : x))
      );
    }
    setEditingId(null);
    setEditingText("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  function clearCompleted() {
    setTodos((t) => t.filter((x) => !x.completed));
  }

  const visible = todos.filter((x) => {
    if (filter === "active") return !x.completed;
    if (filter === "completed") return x.completed;
    return true;
  });

  return (
    <div>
      <h2>Todo List</h2>

      {/* add new */}
      <div>
        <input
          ref={inputRef}
          value={newText}
          placeholder="Add a todo and press Enter"
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* filters */}
      <div>
        <span>Show: </span>
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          disabled={filter === "active"}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          disabled={filter === "completed"}
        >
          Completed
        </button>
      </div>

      {/* bulk actions */}
      <div>
        <span>{todos.filter((t) => !t.completed).length} items left</span>
        <button onClick={clearCompleted}>Clear completed</button>
      </div>

      {/* list */}
      <ul>
        {visible.length === 0 && <li>No todos</li>}

        {visible.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />

            {/* editing inline */}
            {editingId === todo.id ? (
              <span>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitEdit();
                    if (e.key === "Escape") cancelEdit();
                  }}
                  autoFocus
                />
                <button onClick={commitEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </span>
            ) : (
              <span>
                <span>{todo.text}</span>
                <button onClick={() => startEdit(todo.id)}>Edit</button>
                <button onClick={() => removeTodo(todo.id)}>Delete</button>
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* instructions */}
      <div>
        <small>
          Use Enter to add. In edit mode, Enter saves and Esc cancels. Data is
          saved in localStorage.
        </small>
      </div>
    </div>
  );
}
