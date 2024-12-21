const routerMethods = require("../methods");
const routes = require("../routes");
const taskControllers = require("../../controllers/taskController");
const authMiddleware = require("../../middleware/authMiddleware");

const taskRouter = {
  run(req, res) {
    routerMethods.get(
      req,
      res,
      routes.tasks.getTask.value,
      authMiddleware(taskControllers.handleGetTaskByToken)
    );
    routerMethods.post(
      req,
      res,
      routes.tasks.addTask.value,
      authMiddleware(taskControllers.handleAddTask)
    );
    routerMethods.put(
      req,
      res,
      routes.tasks.updateTask.value,
      authMiddleware(taskControllers.handleUpdateTask)
    );
    routerMethods.delete(
      req,
      res,
      routes.tasks.deleteTask.value,
      authMiddleware(taskControllers.handleDeleteTask)
    );
  },
};

module.exports = taskRouter;
