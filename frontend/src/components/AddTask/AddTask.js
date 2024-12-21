import { useState } from "react";
import "./AddTask.css";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/actions";
import { addTaskAPI } from "../../api/taskApi";
// import { v4 as uuidv4 } from "uuid";

function AddTask() {
  const [taskName, setTaskName] = useState("");

  const dispatch = useDispatch();

  const handleAddTask = async () => {
    const newTask = {
      name: taskName,
      status: "undone",
    };
    try {
      const addedTask = await addTaskAPI(newTask);
      dispatch(addTask(addedTask));
      setTaskName("");
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    setTaskName(e.target.value);
  };

  return (
    <div className="add-task-container">
      <input
        type="text"
        placeholder="Add a new task"
        value={taskName}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTask}>Add new</button>
    </div>
  );
}

export default AddTask;
