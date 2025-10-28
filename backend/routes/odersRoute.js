const express = require('express');
const { addOrder, getOrders } = require('../controllers/ordersController');
const verifyToken = require('../middleware/auth');

 const router = express.Router();

 router.post('/orders',addOrder);
 router.get('/getoder',getOrders)

 module.exports = router;