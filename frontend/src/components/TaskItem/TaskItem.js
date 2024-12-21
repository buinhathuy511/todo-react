import "./TaskItem.css";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  toggleTaskStatus,
  updateTaskName,
} from "../../redux/actions";
import { useState } from "react";
import {
  deleteTaskAPI,
  updateTaskStatusAPI,
  updateTaskNameAPI,
} from "../../api/taskApi";

function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.name);

  const handleDeleteTask = async () => {
    try {
      await deleteTaskAPI(task._id);
      dispatch(deleteTask(task._id));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleToggleTaskStatus = async () => {
    const newStatus = task.status === "done" ? "undone" : "done";
    try {
      await updateTaskStatusAPI(task._id, newStatus);
      dispatch(toggleTaskStatus(task._id));
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  const handleEditTask = async () => {
    if (isEditing) {
      try {
        await updateTaskNameAPI(task._id, taskName);
        dispatch(updateTaskName(task._id, taskName));
      } catch (error) {
        console.error("Failed to update task name", error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  return (
    <div
      className={`task-item-container ${
        task.status === "done" ? "completed" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={task.status === "done"}
        onChange={handleToggleTaskStatus}
      />
      {isEditing ? (
        <input type="text" value={taskName} onChange={handleTaskNameChange} />
      ) : (
        <p>{task.name}</p>
      )}
      <button
        className={isEditing ? "save" : ""}
        onClick={handleEditTask}
        disabled={task.status === "done"}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <button className="delete_button" onClick={handleDeleteTask}>Delete</button>
    </div>
  );
}

export default TaskItem;
