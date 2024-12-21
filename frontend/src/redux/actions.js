// action creators là những hàm trả về một object chứa type và payload

export const setTask = (tasks) => {
  return {
    type: "taskList/setTask",
    payload: tasks,
  };
};

export const addTask = (data) => {
  return {
    type: "taskList/addTask",
    payload: data,
  };
};

export const deleteTask = (id) => {
  return {
    type: "taskList/deleteTask",
    payload: id,
  };
};

export const toggleTaskStatus = (id) => {
  return {
    type: "taskList/toggleTaskStatus",
    payload: id,
  };
};

export const setFilter = (filter) => {
  return {
    type: "filter/setFilter",
    payload: filter,
  };
};

export const updateTaskName = (id, name) => {
  return {
    type: "taskList/updateTaskName",
    payload: { id, name },
  };
};
