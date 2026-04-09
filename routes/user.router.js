const authentificationMiddleware = require("../middlewares/auth/authentification.middleware");
const userController = require("../controller/user.controller");

const userRouter = require("express").Router();

userRouter.route("/").get(authentificationMiddleware(), userController.getAll);

module.exports = userRouter;
