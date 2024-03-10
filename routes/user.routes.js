const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router({ tags: ["User"] });

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);

module.exports = router;
