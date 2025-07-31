import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const LOCAL_STORAGE_KEY = "react-ts-todo-list";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo.trim(), completed: false },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 16 }}>
      <h2>Todo List</h2>

      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          style={{ width: "70%", padding: "8px" }}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button
          onClick={addTodo}
          style={{ padding: "8px 12px", marginLeft: 8 }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map(({ id, text, completed }) => (
          <li
            key={id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 8,
              textDecoration: completed ? "line-through" : "none",
              opacity: completed ? 0.6 : 1,
            }}
          >
            <input
              type="checkbox"
              checked={completed}
              onChange={() => toggleTodo(id)}
            />
            <span style={{ flexGrow: 1, marginLeft: 8 }}>{text}</span>
            <button onClick={() => deleteTodo(id)} style={{ marginLeft: 8 }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
