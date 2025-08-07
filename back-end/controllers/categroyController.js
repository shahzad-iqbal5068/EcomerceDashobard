const Category = require('../models/categoryModal');

const findCategory = async (req,res)=>{
    try {
        let data = await Category.find({});
        // console.log(data);
        res.status(201).json(data);

    } catch (error) {
        console.log("Error in api",error);
        res.status(500).json({error:"error in api"})
    }
}
module.exports = findCategory