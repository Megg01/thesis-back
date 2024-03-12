const express = require("express");
const {
  getAllDebts,
  getDebtById,
  createDebt,
  updateDebt,
  deleteDebt,
} = require("../controllers/debt.controller");

const router = express.Router({ tags: ["Debt"] });

router.get("/", getAllDebts);

router.get("/:id", getDebtById);

router.post("/", createDebt);

router.patch("/:id", updateDebt);

router.delete("/:id", deleteDebt);

module.exports = router;
