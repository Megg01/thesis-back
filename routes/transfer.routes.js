const express = require("express");
const {
  getAllTransfers,
  getTransferById,
  createTransfer,
  updateTransfer,
  deleteTransfer,
} = require("../controllers/transfer.controller");

const router = express.Router({ tags: ["Transfer"] });

router.get("/", getAllTransfers);

router.get("/:id", getTransferById);

router.post("/", createTransfer);

router.patch("/:id", updateTransfer);

router.delete("/:id", deleteTransfer);

module.exports = router;