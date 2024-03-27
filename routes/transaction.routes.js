const express = require("express");
const { getAll } = require("../controllers/transaction.controller");

const router = express.Router({ tags: ["Transactions"] });

router.post("/all", getAll);

module.exports = router;
