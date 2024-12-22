import Header from "../components/Header/Header";
import AddTask from "../components/AddTask/AddTask";
import Filter from "../components/Filter/Filter";
import TaskList from "../components/TaskList/TaskList";

function Todo() {
  return (
    <div>
      <Header />
      <AddTask />
      <Filter />
      <TaskList />
    </div>
  );
}

export default Todo;
