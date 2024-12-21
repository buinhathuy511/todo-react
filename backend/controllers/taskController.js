const Task = require("../models/Task");
const httpStatusCodes = require("../utils/constants").httpStatusCodes;

async function handleGetTaskByToken(req, res) {
  try {
    const tasks = await Task.find({ ownerId: req.user._id });
    res.statusCode = httpStatusCodes.OK;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(tasks));
  } catch (error) {
    res.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: error.message }));
  }
}

async function handleAddTask(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    try {
      req.body = JSON.parse(body);
      const { name, status } = req.body;
      const newTask = new Task({ name, status, ownerId: req.user._id });
      await newTask.save();
      res.statusCode = httpStatusCodes.CREATED;
      res.setHeader("Content-Type", "application/json");
      // res.end(JSON.stringify({ message: "Task added successfully" }));
      res.end(JSON.stringify(newTask));
    } catch (error) {
      res.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: error.message }));
    }
  });
}

async function handleUpdateTask(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    try {
      req.body = JSON.parse(body);
      const { taskId, name, status } = req.body;
      const updateFields = {}; // Tạo object chứa các trường cần update
      if (name) {
        updateFields.name = name; // Nếu có trường name thì thêm vào object updateFields
      }
      if (status) {
        updateFields.status = status; // Nếu có trường status thì thêm vào object updateFields
      }
      const updateTask = await Task.findOneAndUpdate(
        { _id: taskId, ownerId: req.user._id }, // Điều kiện tìm kiếm
        updateFields, // Các trường cần update
        { new: true }
      );
      res.statusCode = httpStatusCodes.OK;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          message: "Task updated successfully",
          task: updateTask,
        })
      );
    } catch (error) {
      res.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: error.message }));
    }
  });
}

function handleDeleteTask(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    try {
      req.body = JSON.parse(body);
      const { taskId } = req.body;
      const deleteTask = await Task.findOneAndDelete({
        _id: taskId,
        ownerId: req.user._id,
      });
      if (!deleteTask) {
        res.statusCode = httpStatusCodes.NOT_FOUND;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Task not found" }));
        return;
      }
      res.statusCode = httpStatusCodes.OK;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Task deleted successfully" }));
    } catch (error) {
      res.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: error.message }));
    }
  });
}

module.exports = {
  handleGetTaskByToken,
  handleAddTask,
  handleUpdateTask,
  handleDeleteTask,
};
