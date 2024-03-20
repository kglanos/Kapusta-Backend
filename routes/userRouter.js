const express = require("express");
const userRouter = express.Router();
const { addUser } = require("../controllers/addUser");
const { loginUser } = require("../controllers/loginUser");
const { logoutUser } = require("../controllers/logoutUser");
const { currentUser } = require("../controllers/currentUser");
const { auth } = require("../config/passport-jwt");

userRouter.post("/registration", addUser);

userRouter.post("/login", loginUser);
userRouter.post("/logout", auth, logoutUser);
userRouter.get("/current", auth, currentUser);

module.exports = userRouter;
