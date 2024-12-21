const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["done", "undone"], // chỉ chấp nhận 2 giá trị là "done" hoặc "undone"
    default: "undone", // giá trị mặc định là "undone"
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // tham chiếu đến model User
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
