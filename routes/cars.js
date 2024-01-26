const express = require("express");
const {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/carController");

const router = express.Router();

router.get("/", getCars);

router.get("/:id", getCar);

router.post("/", createCar);

router.delete("/:id", deleteCar);

router.patch("/:id", updateCar);

module.exports = router;
