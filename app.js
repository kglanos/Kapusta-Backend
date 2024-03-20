const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const transactionRouter = require("./routes/transactionRouter")
require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/", userRouter);
app.use("/", transactionRouter)

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
