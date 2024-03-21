const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    isAuth: {
      type: Boolean,
      default: false,
      required: true,
    },
    phoneNo: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("incomes", {
  ref: "Income",
  foreignField: "user",
  localField: "_id",
});
userSchema.virtual("expenses", {
  ref: "Expense",
  foreignField: "user",
  localField: "_id",
});
userSchema.virtual("transfers", {
  ref: "Transfer",
  foreignField: "user",
  localField: "_id",
});
userSchema.virtual("debts", {
  ref: "Debt",
  foreignField: "user",
  localField: "_id",
});

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(4), null);
};

module.exports = mongoose.model("User", userSchema);
