const express = require("express");
const {
  getAllIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/income.controller");

const router = express.Router({ tags: ["Income"] });

router.get("/", getAllIncomes);

router.get("/:id", getIncomeById);

router.post("/", createIncome);

router.patch("/:id", updateIncome);

router.delete("/:id", deleteIncome);

module.exports = router;
