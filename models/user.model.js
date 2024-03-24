const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("incomes", {
  ref: "Income",
  foreignField: "user",
  localField: "id",
});
userSchema.virtual("expenses", {
  ref: "Expense",
  foreignField: "user",
  localField: "id",
});
userSchema.virtual("transfers", {
  ref: "Transfer",
  foreignField: "user",
  localField: "id",
});
userSchema.virtual("debts", {
  ref: "Debt",
  foreignField: "user",
  localField: "id",
});

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(4), null);
};

module.exports = mongoose.model("User", userSchema);
