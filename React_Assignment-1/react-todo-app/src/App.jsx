import React, { useState } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  return (
    <div className="container py-4">
      <Header />
      <div className="input-group mb-4 shadow-sm">
        <input
          type="text"
          className="form-control"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>
      <ToDoList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        editTask={editTask}
      />
    </div>
  );
}

export default App;
