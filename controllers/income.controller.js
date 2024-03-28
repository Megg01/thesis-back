const Income = require("../models/income.model ");
const User = require("../models/user.model");
const uploadImage = require("../utils/uploadImage");
const deleteImage = require("../utils/deleteImage");

// Get all incomes
const getAllIncomes = async (req, res) => {
  try {
    let query = { user: req.body?.user };

    if (req.body?.sdate || req.body?.edate) {
      query.date = {};

      if (req.body?.sdate) {
        query.date.$gte = new Date(req.body.sdate);
      }
      if (req.body.edate) {
        query.date.$lte = new Date(req.body.edate);
      }
    }

    const incomes = await Income.find(query);

    const total = incomes.reduce((total, cur) => total + cur?.value, 0);

    res.status(200).json({ success: true, data: incomes, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get income by ID
const getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Орлого олдсонгүй" });
    }
    res.status(200).json({ success: true, data: income });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new income
const createIncome = async (req, res) => {
  const { user } = req.body;
  let url = null;

  if (req?.files?.[0]) {
    url = await uploadImage(req?.files[0], user + new Date().valueOf());
  } else if (req.body?.image) {
    url = await uploadImage(req.body?.image, user + new Date().valueOf());
  }

  if (!(await User.findOne({ id: user }))) {
    return res.status(400).json({ message: "Ийм хэрэглэгч байхгүй байна" });
  }

  const income = new Income({
    ...req.body,
    image: url?.url,
    user,
  });

  // if (income?.image) {
  //   await uploadImage(income?.image, "incomes");
  // }
  try {
    const savedIncome = await income.save();

    res
      .status(201)
      .json({ success: true, message: "Амжилттай", data: savedIncome });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update income by ID
const updateIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Орлого олдсонгүй" });
    }
    if (income.user.toString() !== req.body?.user.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatedIncome,
      message: "Амжилттай шинэчлэгдлээ",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete income by ID
const deleteIncome = async (req, res) => {
  try {
    const { user } = req.body;

    if (!(await User.findOne({ id: user }))) {
      return res.status(400).json({ message: "Ийм хэрэглэгч байхгүй байна" });
    }

    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Орлого олдсонгүй" });
    }

    if (income?.image) {
      await deleteImage(income.image);
    }

    await income.deleteOne();
    res.status(200).json({ success: true, message: "Амжилттай устлаа" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
};
