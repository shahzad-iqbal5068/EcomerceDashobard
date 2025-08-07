const Product = require("../models/productModel");
const searchConditions = require("../utils/searchConditons");

const Search_Product = async (req, res) => {
  const key = req.params.key;
  const numericKey = Number(key);

  let conditions = searchConditions(key, numericKey);

  try {
    let result = await Product.find({ $or: conditions });
    console.log("Search result:", result);
    if (result.length === 0) {
      return res.status(404).json({ message: "No matching products found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in search API:", error.message);
    res.status(500).json({ api: "failed" });
  }
};

const Search_Product_UserId = async (req, res) => {
  let key = req.params.key;
  let userid = req.params.id;
  let numericKey = Number(key);

  let conditions = searchConditions(key, numericKey);

  try {
    let result = await Product.find({ $or: conditions, userid });
    console.log("Search result:", result);
    if (result.length === 0) {
      return res.status(404).json({ message: "No matching products found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in search API:", error.message);
    res.status(500).json({ api: "failed" });
  }
};

module.exports = { Search_Product, Search_Product_UserId };
