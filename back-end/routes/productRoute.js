const express = require('express');
const {addProduct,getProducts,deleteProduct,AllProducts, countProducts} = require('../controllers/productController');
const verifyToken = require('../middleware/auth');

const router = express.Router();


router.get("/products",AllProducts);

router.post("/add-product",verifyToken,addProduct);
router.get("/products/:id",verifyToken,getProducts);
router.delete("/products/:id",verifyToken,deleteProduct);
router.get("/product/count",verifyToken,countProducts);

module.exports = router;