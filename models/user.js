const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    isAuth: {
      type: Boolean,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    regNo: {
      type: String,
      required: () => this.isAuth,
    },
    address: {
      type: String,
      required: () => this.isAuth,
    },
    imagePassportFace: {
      type: Image,
      required: () => this.isAuth,
    },
    imagePassportFront: {
      type: Image,
      required: () => this.isAuth,
    },
    imagePassportBack: {
      type: Image,
      required: () => this.isAuth,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(4), null);
};

userSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
