const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    user: {
      type: String,
      ref: "user",
      required: true,
    },
    value: {
      type: Number,
      min: 0,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    wallet: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      default: "expense",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
