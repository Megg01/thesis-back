const mongoose = require("mongoose");
const Expense = require("../models/expense.model");

// Get all expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.body?.user });
    res.status(200).json({ success: true, data: expenses });
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
  const expense = new Expense({
    ...req.body,
    user: req.body?.user,
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
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Зарлага олдсонгүй" });
    }
    if (expense.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await expense.remove();
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
