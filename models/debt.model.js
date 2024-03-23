const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const debtSchema = new Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    creditor: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    originalAmount: {
      type: Number,
      min: 0,
      required: true,
    },
    currentBalance: {
      type: Number,
      min: 0,
      required: true,
    },
    interestRate: {
      type: Number,
      min: 0,
      required: true,
    },
    minimumPayment: {
      type: Number,
      min: 0,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paymentHistory: [
      {
        date: {
          type: Date,
        },
        amount: {
          type: Number,
        },
      },
    ],
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

debtSchema.pre("save", function (next) {
  if (this.isModified("paymentHistory")) {
    const totalPayments = this.paymentHistory.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    this.currentBalance = this.originalAmount - totalPayments;
  }
  next();
});

module.exports = mongoose.model("Debt", debtSchema);
