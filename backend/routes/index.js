const taskRouter = require("./taskRouter/taskRouter");
const userRouter = require("./userRouter/userRouter");

const router = {
  run: function (req, res) {
    userRouter.run(req, res);
    taskRouter.run(req, res);
  },
};

module.exports = router;
