const Order = require("../models/ordersModal");

const addOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: `Error adding order: ${err.message}` });
  }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.query.userId;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addOrder , getOrders};
