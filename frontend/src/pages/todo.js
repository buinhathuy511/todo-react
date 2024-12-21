import Header from "../components/Header/Header";
import AddTask from "../components/AddTask/AddTask";
import Filter from "../components/Filter/Filter";
import TaskList from "../components/TaskList/TaskList";

function Todo() {
  // const [tasksList, setTasksList] = useState(() => {
  //   const storageTasks = JSON.parse(localStorage.getItem("tasks"));
  //   return storageTasks ?? [];
  // });

  // const handleAddTask = (task) => {
  //   setTasksList((prev) => {
  //     const newTasks = [...prev, task];
  //     localStorage.setItem("tasks", JSON.stringify(newTasks));
  //     return newTasks;
  //   });
  // };

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasksList));
  // }, [tasksList]);

  return (
    <div>
      {/* <Header />
      <AddTask onAddTask={handleAddTask} />
      <Filter />
      <TaskList tasks={tasksList} /> */}
      <Header />
      <AddTask />
      <Filter />
      <TaskList />
    </div>
  );
}

export default Todo;
