const express = require("express");
const {
  login,
  signup,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);

module.exports = router;
