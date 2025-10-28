const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    brand: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
     image: { type: String, default: "" },        // Cloudinary URL
    imagePublicId: { type: String, default: "" }, // Cloudinary public_id
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);