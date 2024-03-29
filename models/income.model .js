const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const incomeSchema = new Schema(
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
      default: "income",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);
