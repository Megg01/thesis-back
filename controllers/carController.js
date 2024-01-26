const car = require("../models/car");
const mongoose = require("mongoose");

// get all
const getCars = async (req, res) => {
  const cars = await car.find({}).sort({ createdAt: -1 });

  res.status(200).json(cars);
};

// get a single
const getCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Буруу ID" });
  }

  try {
    const car = await car.findById(id);

    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// create a new
const createCar = async (req, res) => {
  const { name } = req.body;

  try {
    const car = await car.create({ name });

    res.status(200).json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete a single
const deleteCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Буруу ID" });
  }

  try {
    const car = await car.findOneAndDelete({ _id: id });

    res.status(200).json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update a single
const updateCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Буруу ID" });
  }

  try {
    const car = await car.findOneAndUpdate({ _id: id }, { ...req.body });

    res.status(200).json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
};
