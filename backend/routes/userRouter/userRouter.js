const { httpMethods } = require("../../utils/constants");
const routesMethods = require("../methods");
const routes = require("../routes");
const userControllers = require("../../controllers/userController");

const userRouter = {
  run(req, res) {
    if (
      req.method === httpMethods.POST &&
      req.url === routes.user.login.value
    ) {
      routesMethods.post(
        req,
        res,
        routes.user.login.value,
        userControllers.handleLogin
      );
    }
    if (
      req.method === httpMethods.POST &&
      req.url === routes.user.register.value
    ) {
      routesMethods.post(
        req,
        res,
        routes.user.register.value,
        userControllers.handleRegister
      );
    }
  },
};

module.exports = userRouter;
