const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    default: null,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/;
      return re.test(String(value).trim().toLowerCase());
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  token: {
    type: String,
    default: null,
  },
  balance: {
    type: Number,
    default: 0,
    required: [true, "Set year for transaction"],
  },
});

const User = mongoose.model("user", user);

module.exports = User;

// const userSchema = new Schema(
//   {
//     // name: {
//     //   type: String,
//     //   default: "Guest",
//     // },
//     // email: {
//     //   type: String,
//     //   required: [true, "Set email for user"],
//     //   unique: true,
//     //   validate(value) {
//     //     const re = /\S+@\S+\.\S+/;
//     //     return re.test(String(value).trim().toLowerCase());
//     //   },
//     // },
//     password: {
//       type: String,
//       // required: [true, 'Set password for user'],
//     },
//     balance: {
//       type: Number,
//       default: 0,
//       required: [true, "Set year for transaction"],
//     },
//     role: {
//       type: String,
//       enum: {
//         values: Object.values(Role),
//         message: "Role is not allowed",
//       },
//       default: Role.USER,
//     },
//     rebalancing: {
//       type: Boolean,
//       default: false,
//       required: [true, "Set rebalancing for transaction"],
//     },
//     token: {
//       type: String,
//       default: null,
//     },
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//     toObject: { virtuals: true },
//   }
// );