require("dotenv").config();

const express = require("express");
const cors = require("cors");

const logger = require("morgan");

const transactionRouter = require("./routes/transactionRouter")
const userRouter = require("./routes/userRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/", userRouter); // ten route jest ten sam do tego poniżej
app.use("/", transactionRouter)
/*
app.use("/auth", userRouter);
app.use("/transactions", transactionRouter)
*/

app.get("/", (req, res) => {
  res.send("Server is working!"); // this is not needed. it is used already in server.js
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
