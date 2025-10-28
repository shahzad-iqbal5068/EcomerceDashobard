const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET_key;
const saltRound =  parseInt(process.env.SALT_ROUND);

const registerUser = async (req, res) => {
    try {
    let userdetail = req.body;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(userdetail.password, salt);
    userdetail["password"] = hash;

    let user = new User(userdetail);
    let data = await user.save();
    console.log(data);
    if(data.isAllowed !== false){

    Jwt.sign({ data }, jwtKey, { expiresIn: "5m" }, (err, token) => {
      if (err) {
        res.status(501).json({ result: "something went wrong" });
      }
      res.status(200).json({ data, auth: token });
    });
  }else{
    res.status(200).json(data);
  }
  } catch (error) {
    res.status(500).json({ error: `Error in api ${error}` });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
     throw new Error("Enter correct email & password");
    }

    let user = await User.findOne({ email });
    if (!user) {
      throw new Error( "user not found" );
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "5m" }, (err, token) => {
        if (err) {
          // throw new Error("Something went wrong while generating token");
        }
        res.status(200).json({status:200, user, auth: token });
      });
    } else {
      throw new Error("Invalid Password");
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
};

const findUser = async(req,res)=>{
      let id = req.params.id
   try {
      let data = await User.find({_id:id});
      res.status(200).json(data);
   } catch (error) {
      res.status(500).json({error:"Error in api"});    
   }
  };
  const updateUser = async(req,res)=>{
        let id = req.params.id;
        let {profileImg} = req.body;
        try {
            let result =await User.updateOne({_id:id},{$set:{profileImg}});
            // console.log(result);
            res.status(201).json({message:"Profile image sucessfuly updated",result});
        } catch (error) {
            res.status(500).json({error:`Error in api ${error}`})
        }
    };

  const countUser = async(req,res)=>{
    try {
      let customerUser = await User.countDocuments({role:"customer"})
      let totalVendor = await User.countDocuments({role:"vendor"});
      let allowedVendor = await User.countDocuments({isAllowed:true});
      let notAllowedVendor = await User.countDocuments({isAllowed:false});
      
      // console.log("vendor in db is",{customerUser,totalVendor,allowedVendor,notAllowedVendor});
      res.status(201).json({totalVendor,customerUser,allowedVendor,notAllowedVendor});
    } catch (error) {
      res.status(500).json({error});
    }
  }

module.exports = {registerUser,loginUser,findUser,updateUser ,countUser};