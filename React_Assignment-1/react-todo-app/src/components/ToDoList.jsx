import ToDoItem from "./ToDoItem";

function ToDoList({ tasks, deleteTask, toggleComplete, editTask }) {
  return (
    <div className="row g-3">
      {tasks.map((task) => (
        <div className="col-md-6" key={task.id}>
          <ToDoItem
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            editTask={editTask}
          />
        </div>
      ))}
    </div>
  );
}

export default ToDoList;
