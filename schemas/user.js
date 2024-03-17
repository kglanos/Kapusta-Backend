const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    default: null,
  },
});

const User = mongoose.model("user", user);

module.exports = User;
