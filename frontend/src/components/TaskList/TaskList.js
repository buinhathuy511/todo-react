import TaskItem from "../TaskItem/TaskItem";
import { useSelector, useDispatch } from "react-redux";
import { taskRemainingSelector } from "../../redux/selectors";
import { useEffect } from "react";
import { setTask } from "../../redux/actions";
import { getTaskAPI } from "../../api/taskApi";

function TaskList() {
  const dispatch = useDispatch();
  const taskList = useSelector(taskRemainingSelector) || [];
  // console.log(taskList);

  // add [dispatch] để tuân thủ quy tắc useEffect và tránh warning
  useEffect(() => {
    const getTaskList = async () => {
      try {
        const tasks = await getTaskAPI();
        dispatch(setTask(tasks) || []);
      } catch (error) {
        console.error("Failed to get task list", error);
      }
    };
    getTaskList();
  }, [dispatch]);

  return (
    // <div>
    //   {taskList.map((task) => (
    //     <TaskItem key={task.id} task={task} />
    //   ))}
    // </div>
    <div>
      {taskList.length > 0 ? (
        taskList.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p style={{ textAlign: "center" }}>No tasks available</p>
      )}
    </div>
  );
}

export default TaskList;
