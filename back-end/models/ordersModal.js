const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],

    totalAmount: { type: Number, required: true },  // total price
    address: { type: String, required: true },      // delivery address
    paymentMethod: { type: String, default: "COD" }, // e.g., Cash on Delivery, Card
    status: { type: String, default: "pending" },   // pending, shipped, delivered
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
