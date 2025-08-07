 const express = require('express');
 const {Search_Product , Search_Product_UserId} = require("../controllers/searchController")
 const router = express.Router();
 const verifyToken = require ('../middleware/auth')


 router.get("/search/:key", Search_Product);
 router.get("/search/:key/:id",verifyToken, Search_Product_UserId);

 module.exports = router;