const express = require("express");
const registrationRouter = express.Router();
const { addUser } = require("../controllers/addUser")

registrationRouter.post("/registration", addUser)

module.exports = registrationRouter