const mongoose = require('mongoose');
 const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    brand:String,
    category:String,
    userid: String,
 });
 const Product = mongoose.model('products',productSchema);

 const userschema = new mongoose.Schema({
   name:String,
   password:String,
   email:String
 })
 const User = mongoose.model('users',userschema);
 module.exports ={ Product , User} ;
