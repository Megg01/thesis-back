const User = require("../models/user");
const mongoose = require("mongoose");

// get all
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
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
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// create a new
const createUser = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.create({ name });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
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

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update a single
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Буруу ID" });
  }

  try {
    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
