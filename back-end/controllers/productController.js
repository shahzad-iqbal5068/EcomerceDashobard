const Product = require('../models/productModel');

const addProduct = async(req,res)=>{
    try {
        let product = new Product(req.body);
        console.log(product);
         let data = await product.save();
         res.status(201).json(data);
         console.log(data);
        
    } catch (error) {
        res.status(500).json({error:`Error in api ${error}`}) 
    }
};

const deleteProduct = async(req,res)=>{
    try {
        
        let  result =  await Product.deleteOne({_id:req.params.id});
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({error:`Error in delete prouducts ${error}`})
        
    }
};

const getProducts = async(req,res)=>{
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
};
const AllProducts = async(req,res)=>{
    try {
        let products = await Product.find();
        if(products.length > 0){
            res.status(201).json(products);
        }else{
            res.status(404).json({result:'Products not found'})
        }        
    } catch (error) {
        res.status(500).json({error:`Error in api ${error}`}) 
    }
};

const countProducts = async (req,res)=>{
    try {
        let product = await Product.countDocuments();
        res.status(201).json({product});
    } catch (error) {
        res.status(500).json(error)
    }
}



module.exports = {addProduct,getProducts,deleteProduct,AllProducts,countProducts };
