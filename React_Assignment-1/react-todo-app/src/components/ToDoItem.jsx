import { useState } from "react";

function ToDoItem({ task, deleteTask, toggleComplete, editTask }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (newText.trim()) {
      editTask(task.id, newText);
      setEditing(false);
    }
  };

  return (
    <div className={`card shadow-sm ${task.completed ? "bg-light" : ""}`}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5
            className={`card-title mb-0 ${
              task.completed ? "text-decoration-line-through text-muted" : ""
            }`}
          >
            {task.text}
          </h5>
          <span
            className={`badge mt-1 ${
              task.completed ? "bg-success" : "bg-warning text-dark"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>
        <div className="btn-group">
          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => toggleComplete(task.id)}
          >
            ✅
          </button>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setEditing(true)}
          >
            ✏️
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => deleteTask(task.id)}
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="card-footer bg-white border-top">
          <div className="input-group input-group-sm">
            <input
              className="form-control"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleEdit}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToDoItem;
