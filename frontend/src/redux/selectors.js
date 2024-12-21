import { createSelector } from "reselect";

export const taskListSelector = (state) => state.taskList;
export const filterSelector = (state) => state.filter.status;

//reselect library: dùng khi có một selector phụ thuộc vào selector khác
export const taskRemainingSelector = createSelector(
  taskListSelector,
  filterSelector,
  (taskList, filter) => {
    // Nếu filter === "done" thì trả về toàn bộ danh sách task
    if (filter === "all") {
      return taskList;
    }

    // Xác định trạng thái cần lọc
    let statusForFilter;
    if (filter === "done") {
      statusForFilter = "done";
    } else {
      statusForFilter = "undone";
    }

    // Lọc danh sách task dựa trên trạng thái
    const filteredTaskList = taskList.filter((task) => {
      if (task.status === statusForFilter) {
        return true;
      } else {
        return false;
      }
    });

    return filteredTaskList;
  }
);
