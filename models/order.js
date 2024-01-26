const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  carId: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    enum: ['cash', 'card', 'e-wallet', 'bank-transfer', 'pay-later'],
    required: true
  },
}, {timestamps: true});


module.exports = mongoose.model("Order", orderSchema);