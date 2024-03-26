const Transfer = require("../models/transfer.model");

// Get all transfers
const getAllTransfers = async (req, res) => {
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

    const transfers = await Transfer.find(query);

    const total = transfers?.reduce((total, cur) => total + cur?.value, 0);

    res.status(200).json({ success: true, data: transfers, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single transfer by ID
const getTransferById = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id);
    if (!transfer) {
      return res.status(404).json({ message: "Шилжүүлэг олдсонгүй" });
    }

    if (transfer.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ success: true, data: transfer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new transfer
const createTransfer = async (req, res) => {
  const transfer = new Transfer({
    ...req.body,
    user: req.body?.user,
  });

  try {
    const savedTransfer = await transfer.save();
    res
      .status(201)
      .json({ success: true, message: "Амжилттай", data: savedTransfer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a transfer by ID
const updateTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id);
    if (!transfer) {
      return res.status(404).json({ message: "Шилжүүлэг олдсонгүй" });
    }

    if (transfer.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedTransfer = await Transfer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatedTransfer,
      message: "Амжилттай шинэчлэгдлээ",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a transfer by ID
const deleteTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id);
    if (!transfer) {
      return res.status(404).json({ message: "Шилжүүлэг олдсонгүй" });
    }

    if (transfer.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await transfer.remove();
    res.status(200).json({ success: true, message: "Амжилттай устлаа" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTransfers,
  getTransferById,
  createTransfer,
  updateTransfer,
  deleteTransfer,
};
