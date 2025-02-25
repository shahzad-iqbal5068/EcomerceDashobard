const express = require('express');
const app = express();
app.use(express.json()); // midlaware for post request
const port = 5000;
const cors = require('cors');
app.use(cors());
require('./Db/config.js');
const {Product , User} = require('./Db/dbSchema.js');
const Jwt = require('jsonwebtoken');
let jwtKey ='E-COM'

app.get('/',async(req,res)=>{
try {
    let data = await Product.find({});
    res.status(200).json(data)
} catch (error) {
    res.status(500).json({error:"Error in api"})
}
});
app.get('/user',async(req,res)=>{
 try {
    let data = await User.find({});
    res.status(200).json(data);
 } catch (error) {
    res.status(500).json({error:"Error in api"});    
 }
});

app.post('/register',async(req,res)=>{   // for register user singup
   try {
    let user = new User(req.body);
    let data = await user.save();
    // for removing password from db
    data = data.toObject();
    delete data.password
    
    Jwt.sign({data},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.status(501).json({result: "something went wrong"})
        }
        res.status(200).json({data,auth:token})
    })
   } catch (error) {
    res.status(500).json({error:`Error in api ${error}`})
   }
});

app.post('/login',async(req,res)=>{

    try {
        if(req.body.email && req.body.password){
            // for removing password use .select('-password')
            let user = await User.findOne(req.body).select('-password')
            if(user){
                Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                    if(err){
                        res.status(501).json({result: "something went wrong"})
                    }
                    res.status(200).json({user,auth:token})
                })
            }else{
                res.status(404).json({error:"user not found"})
            }
        }else{
            res.status(409).json({error:"Enter correct email & password"})
        }        
    } catch (error) {
        res.status(500).json({error:`Error in api ${error}`});
    }
});
app.post('/add-product',verifyToken,async(req,res)=>{
    try {
        let product = new Product(req.body);
        // console.log(product);
         let data = await product.save();
         res.status(201).json(data);
        
    } catch (error) {
        res.status(500).json({error:`Error in api ${error}`}) 
    }
});
app.get('/products/:id',verifyToken,async(req,res)=>{
    try {
        let products = await Product.find({userid:req.params.id});
        if(products.length > 0){
            res.status(201).json(products);
        }else{
            res.status(404).json({result:'products not found'})
        }
        
    } catch (error) {
        res.status(500).json({error:`Error in api ${error}`}) 
    }
});
app.delete('/products/:id',verifyToken,async(req,res)=>{
    try {
        
        let  result =  await Product.deleteOne({_id:req.params.id});
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({error:`Error in delete prouducts ${error}`})
        
    }
});
app.get('/product/:id', verifyToken ,async(req,res)=>{
    try {
        let result = await Product.findOne({_id: req.params.id});
        if(result){
        res.status(201).json(result); 
    }else {
        res.status(404).json({error:' no user found'})
    }      
    } catch (error) {
        res.status(500).json({error:`Error in find product ${error}`})
    }
});
app.put('/products/:id',verifyToken,async(req,res)=>{
      try {
        let result = await Product.updateOne({_id:req.params.id},{$set:req.body});
        if(result.modifiedCount === 0){
            res.status(404).json({error:`Product not found and changes not made`})
        }else{
            res.status(200).json({message:"update Succesfully"+result})
        }
      } catch (error) {
        res.status(500).json({error:`Error in update product ${error}`});
      }
});
app.get("/search/:key/:id",verifyToken, async (req, res) => {
    // console.log("API running:", req.params.key);
    
    let key = req.params.key;
    let userid = req.params.id
    let numericKey = Number(key); // Convert to number

    let conditions = [
        { name: { $regex: key, $options: "i" } },
        { brand: { $regex: key, $options: "i" } },
        { category: { $regex: key, $options: "i" } }
    ];

    // Only add the price condition if the key is a valid number
    if (!isNaN(numericKey)) {
        conditions.push({ price: numericKey });
    }

    let result = await Product.find({
        "$or": conditions,
        userid: userid
    });

    res.send(result);
});

app.get('/test',  verifyToken,async(req,res)=>{
    let result =  await Product.find();
    res.send(result);
})
function verifyToken (req,res,next){
    let token = req.headers['authorization']
    
    if(token){
        token = token.split(' ')[1];
        console.warn("middleware called",token);
        Jwt.verify(token,jwtKey,(err,valid)=>{
          if(err){
             console.log("error occoured in verification")
             res.status(401).send("plz enter correct token")
          }else{
            console.log("verification suceesfully")
            next();
          }
        })
    }else{
       res.status(403).send({result:" please add token with header"})
    }
    
}

app.listen(port,()=>{
    console.log(`App  is running on server: ${port}`);
});
