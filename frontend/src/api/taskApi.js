import axios from "axios";
import API_URL from "../utils/constants";

// Do chưa làm phần xác thực người dùng nên sẽ hard code token
const tokenHardCode =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWMzZGY0MjNmMTRiMTYwN2NkNDBkNyIsImlhdCI6MTczNDgwMzQyMSwiZXhwIjoxNzM0ODg5ODIxfQ.513BHOhU--0MRlCgjZ8YuVdsf0_ILXHoq0Z5XTLXQRY";

export const addTaskAPI = async (task) => {
  try {
    const response = await axios.post(API_URL.task.add, task, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenHardCode}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTaskAPI = async () => {
  try {
    const response = await axios.get(API_URL.task.get, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenHardCode}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTaskAPI = async (taskId) => {
  try {
    const response = await axios.delete(API_URL.task.delete, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenHardCode}`,
      },
      data: { taskId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTaskStatusAPI = async (taskId, status) => {
  try {
    const response = await axios.put(
      API_URL.task.update,
      { taskId, status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenHardCode}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTaskNameAPI = async (taskId, name) => {
  try {
    const response = await axios.put(
      API_URL.task.update,
      { taskId, name },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenHardCode}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
