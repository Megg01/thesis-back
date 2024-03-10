const express = require("express");
const { login, signup } = require("../controllers/auth.controller");

const router = express.Router({ tags: ["Auth"] });

router.post("/login", login);

router.post("/signup", signup);

module.exports = router;
