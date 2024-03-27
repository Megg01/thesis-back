const User = require("../models/user.model");

// get a single
const getAll = async (req, res) => {
  try {
    const userId = req?.body?.user;

    const user = await User.findOne({ id: userId })
      .populate("incomes")
      .populate("expenses")
      .populate("transfers")
      .populate("debts")
      .exec();

    // const totalIncome = user?.incomes?.reduce(
    //   (total, cur) => total + cur?.value,
    //   0
    // );
    // const totalExpense = user?.expenses?.reduce(
    //   (total, cur) => total + cur?.value,
    //   0
    // );
    // const totalTransfer = user?.transfers?.reduce(
    //   (total, cur) => total + cur?.value,
    //   0
    // );
    // const totalDebt = user?.debts?.reduce(
    //   (total, cur) => total + cur?.value,
    //   0
    // );

    const data = [...user?.transfers, ...user?.incomes, ...user?.expenses].sort(
      (a, b) => b?.date - a?.date
    );

    if (user) {
      res.status(200).json({
        success: true,
        data,
      });
    } else {
      res.status(404).json({ success: false, message: "гүйлгээ олдсонгүй" });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAll,
};
