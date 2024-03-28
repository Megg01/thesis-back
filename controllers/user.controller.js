const User = require("../models/user.model");
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

  if (!(await User.find({ id: id }))) {
    return res.status(400).json({ message: "Буруу ID" });
  }

  try {
    const user = await User.findOne({ id: id })
      .populate("incomes")
      .populate("expenses")
      .populate("transfers")
      .populate("debts")
      .exec();

    const totalIncome = user?.incomes?.reduce(
      (total, cur) => total + cur?.value,
      0
    );
    const totalExpense = user?.expenses?.reduce(
      (total, cur) => total + cur?.value,
      0
    );
    const totalTransfer = user?.transfers?.reduce(
      (total, cur) => total + cur?.value,
      0
    );
    const totalDebt = user?.debts?.reduce(
      (total, cur) => total + cur?.value,
      0
    );

    // const allTransactions = [
    //   ...user?.transfers,
    //   ...user?.incomes,
    //   ...user?.expenses,
    // ].sort((a, b) => b?.date - a?.date);

    if (user) {
      res.status(200).json({
        success: true,
        data: {
          ...user.toObject(),
          totalIncome,
          totalExpense,
          totalTransfer,
          totalDebt,
          // allTransactions,
        },
      });
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

  if (!(await User.findOne({ id: id }))) {
    return res.status(400).json({ message: "Буруу ID" });
  }

  try {
    const user = await User.findOneAndDelete({ id: id });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// update a single
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!(await User.findOne({ id: id }))) {
    return res.status(400).json({ success: false, message: "Буруу ID" });
  }

  try {
    const user = await User.findOneAndUpdate({ id: id }, { ...req.body });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
