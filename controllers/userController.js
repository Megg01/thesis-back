const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createSecretToken } = require("../utils/secretToken");

// login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      const isValid = await bcrypt.compareSync(password, user.password);
      if (!isValid) {
        return res.status(403).json({
          success: true,
          message: "Хэрэглэгчийн нэр эсвэл нууц үг таарсангүй",
        });
      } else {
        const token = createSecretToken(user._id);
        return res
          .status(200)
          .json({
            success: true,
            data: user,
            token,
            message: "Амжилттай нэвтэрлээ",
          });
      }
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// sign up
const signup = async (req, res, next) => {
  try {
    const { fname, lname, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res
        .status(201)
        .json({ message: "Аль хэдийн бүртгэгдсэн мэйл хаяг байна" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 4);
      const newUser = new User({
        fname: fname,
        lname: lname,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({ success: true, message: "Амжилттай бүртгэгдлээ" });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// get all
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// get a single
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Буруу ID" });
  }

  try {
    const user = await User.findById(id);

    if (user) {
      res.status(200).json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: "Хэрэглэгч олдсонгүй" });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// create a new
const createUser = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.create({ name });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// delete a single
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Буруу ID" });
  }

  try {
    const user = await User.findOneAndDelete({ _id: id });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// update a single
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Буруу ID" });
  }

  try {
    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = {
  login,
  signup,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
