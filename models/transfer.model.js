const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transferSchema = new Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transfer", transferSchema);
