const mongoose = require("mongoose");

const Debt = require("../models/debt.model");

// Get all debts for a specific user
const getAllDebts = async (req, res) => {
  try {
    const debts = await Debt.find({ user: req.user.id });
    res.status(200).json({ success: true, data: debts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get debt by ID
const getDebtById = async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);
    if (!debt) {
      return res
        .status(404)
        .json({ message: "Төлбөр төлөх ёстой зээл олдсонгүй" });
    }
    if (debt.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ success: true, data: debt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new debt
const createDebt = async (req, res) => {
  const debt = new Debt({
    ...req.body,
    user: req.user?.id,
  });

  try {
    const savedDebt = await debt.save();
    res.status(201).json({ success: true, data: savedDebt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update debt by ID
const updateDebt = async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);
    if (!debt) {
      return res
        .status(404)
        .json({ message: "Төлбөр төлөх ёстой зээл олдсонгүй" });
    }
    if (debt.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedDebt = await Debt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedDebt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete debt by ID
const deleteDebt = async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);
    if (!debt) {
      return res
        .status(404)
        .json({ message: "Төлбөр төлөх ёстой зээл олдсонгүй" });
    }
    if (debt.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await debt.remove();
    res.status(200).json({ success: true, message: "Амжилттай устлаа" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDebts,
  getDebtById,
  createDebt,
  updateDebt,
  deleteDebt,
};
