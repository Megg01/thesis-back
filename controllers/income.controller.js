const mongoose = require("mongoose");
const multer = require("multer");
const Income = require("../models/income.model ");
const { waitForDebugger } = require("inspector");

// Get all incomes
const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id });
    res.status(200).json({ success: true, data: incomes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get income by ID
const getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Орлого олдсонгүй" });
    }
    if (income.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ success: true, data: income });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new income
const createIncome = async (req, res) => {
  console.log("🚀 ~ createIncome ~ req.body:", req.body);

  const income = new Income({
    ...req.body,
    user: req.body?.user,
  });

  console.log("🚀 ~ createIncome ~ req.body:", income);

  try {
    const savedIncome = await income.save();
    res.status(201).json({ success: true, data: savedIncome });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update income by ID
const updateIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Орлого олдсонгүй" });
    }
    if (income.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedIncome });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete income by ID
const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Орлого олдсонгүй" });
    }
    if (income.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await income.remove();
    res.status(200).json({ success: true, message: "Амжилттай устлаа" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
};
