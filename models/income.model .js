const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const incomeSchema = new Schema(
  {
    user: {
      type: String,
      ref: "User",
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
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);
