const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    operation: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sum: {
      type: Number,
      required: false,
    },
    date: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: false,
    },
    year: {
      type: String,
      required: false,
    },
    currency: {
      type: String,
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Transaction = model("transaction", schema);

module.exports = Transaction;

