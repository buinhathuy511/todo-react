const initState = {
  filter: {
    status: "all",
  },
  taskList: [],
};

const rootReducer = (state = initState, action) => {
  /* Ví dụ của 1 action
      {
        type: 'ADD_TASK',
        payload: {id: 4, name: 'Learn Node.js', status: 'false'}
    }
  */
  // console.log(state, action);
  switch (action.type) {
    case "taskList/setTask":
      return {
        ...state,
        taskList: action.payload,
      };
    case "taskList/addTask":
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
      };
    case "taskList/deleteTask":
      return {
        ...state,
        taskList: state.taskList.filter((task) => task._id !== action.payload),
      };
    case "taskList/toggleTaskStatus":
      const updateTaskList = state.taskList.map((task) => {
        if (task._id === action.payload) {
          if (task.status === "undone") {
            return { ...task, status: "done" };
          } else {
            return { ...task, status: "undone" };
          }
        } else {
          return task;
        }
      });
      // Đưa task đã hoàn thành xuống cuối danh sách
      const sortedTaskList = updateTaskList.sort((a, b) => {
        if (a.status === "done") {
          return 1;
        } else {
          return -1;
        }
      });
      return {
        ...state,
        taskList: sortedTaskList,
      };
    case "filter/setFilter":
      return {
        ...state,
        filter: {
          ...state.filter,
          status: action.payload,
        },
      };
    case "taskList/updateTaskName":
      const updatedTaskList = state.taskList.map((task) => {
        if (task._id === action.payload.id) {
          return { ...task, name: action.payload.name };
        }
        return task;
      });
      return {
        ...state,
        taskList: updatedTaskList,
      };
    default:
      return state;
  }
};

export default rootReducer;
