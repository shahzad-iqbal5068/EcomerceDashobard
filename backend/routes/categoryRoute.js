const express = require('express');
const findCategory = require('../controllers/categroyController');
const verifyToken = require('../middleware/auth');

 const router = express.Router();

 router.get('/category',verifyToken,findCategory);

 module.exports = router;