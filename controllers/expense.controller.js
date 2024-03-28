const User = require("../models/user.model");
const Expense = require("../models/expense.model");
const uploadImage = require("../utils/uploadImage");
const deleteImage = require("../utils/deleteImage");

// Get all expenses
const getAllExpenses = async (req, res) => {
  try {
    let query = { user: req.body?.user };

    if (req.body?.sdate || req.body?.edate) {
      query.date = {};

      if (req.body?.sdate) {
        query.date.$gte = new Date(req.body.sdate);
      }
      if (req.body.edate) {
        query.date.$lte = new Date(req.body.edate);
      }
    }

    const expenses = await Expense.find(query);

    const total = expenses?.reduce((total, cur) => total + cur?.value, 0);

    res.status(200).json({ success: true, data: expenses, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get expense by ID
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params?.id);
    if (!expense) {
      return res.status(404).json({ message: "Зарлага олдсонгүй" });
    }
    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new expense
const createExpense = async (req, res) => {
  const { user } = req.body;
  let url = null;

  if (req?.files?.[0]) {
    url = await uploadImage(req?.files[0], user + new Date().valueOf());
  } else if (req.body?.image) {
    url = await uploadImage(req.body?.image, user + new Date().valueOf());
  }

  if (!(await User.findOne({ id: user }))) {
    return res.status(400).json({ message: "Ийм хэрэглэгч байхгүй байна" });
  }

  const expense = new Expense({
    ...req.body,
    user,
    image: url?.url,
  });

  try {
    const savedExpense = await expense.save();
    res
      .status(201)
      .json({ success: true, message: "Амжилттай", data: savedExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update expense by ID
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Зарлага олдсонгүй" });
    }
    if (expense.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatedExpense,
      message: "Амжилттай шинэчлэгдлээ",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete expense by ID
const deleteExpense = async (req, res) => {
  try {
    const { user } = req.body;

    if (!(await User.findOne({ id: user }))) {
      return res.status(400).json({ message: "Ийм хэрэглэгч байхгүй байна" });
    }
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Зарлага олдсонгүй" });
    }

    if (expense?.image) {
      await deleteImage(expense.image);
    }

    await expense.deleteOne();

    res.status(200).json({ success: true, message: "Амжилттай устлаа" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
