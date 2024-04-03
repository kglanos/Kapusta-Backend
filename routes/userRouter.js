const express = require("express");
const userRouter = express.Router();
const { addUser } = require("../controllers/addUser");
const { loginUser } = require("../controllers/loginUser");
const { logoutUser } = require("../controllers/logoutUser");
const { currentUser } = require("../controllers/currentUser");
const { updateInitialBalance } = require("../controllers/updateBalance");
const { auth } = require("../config/passport-jwt");

userRouter.post("/registration", addUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/current", auth, currentUser);
userRouter.patch("/user/balance", auth, updateInitialBalance);

module.exports = userRouter;
