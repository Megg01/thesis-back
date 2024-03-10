const express = require("express");
const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense.controller");

const router = express.Router({ tags: ["Expense"] });

router.get("/", getAllExpenses);

router.get("/:id", getExpenseById);

router.post("/", createExpense);

router.patch("/:id", updateExpense);

router.delete("/:id", deleteExpense);

module.exports = router;
