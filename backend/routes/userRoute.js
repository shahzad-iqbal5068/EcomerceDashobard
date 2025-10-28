const express = require('express');
const {registerUser,loginUser, findUser,updateUser,countUser} = require ('../controllers/userController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/users/:id",verifyToken,findUser);
router.get("/updateuser/:id",verifyToken,updateUser);
router.get("/user/count",verifyToken,countUser)

module.exports = router;