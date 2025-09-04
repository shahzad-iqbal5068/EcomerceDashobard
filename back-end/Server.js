const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const passport = require("passport");
const session = require("express-session"); 
require("./middleware/googleauth"); 
const Product = require("./models/productModel");
const Category = require("./models/categoryModal");
const cloudinary = require("cloudinary");
const  fileupload = require("express-fileupload");
const verifyToken= require("./middleware/auth");


dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Enable file upload
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "/tmp/",   // required for file.tempFilePath
}));



app.use("/", require("./routes/userRoute"));
app.use("/", require("./routes/productRoute"));
app.use("/", require('./routes/categoryRoute'));
app.use("/", require('./routes/searchRoute'));

// Session Middleware (Required for persistent login sessions)
app.use(
    session({
        secret: "your_secret_key", // Replace with a strong secret key
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Google Authentication Routes
app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback Route
app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        if (req.user.role === "vendor") {
            res.redirect("http://localhost:5173/MyProducts");
        } else {
                res.redirect("http://localhost:5173");
        }
    }
);

// Logout Route
app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.send("Logged out successfully");
    });
});


app.post("/setcategory",async(req,res)=>{
    const data=req.body
    try {
        const savedcatgories = await Category.insertMany(data)
        res.status(201).json({message:"saved sucessfully",data:savedcatgories})
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }

});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/upload/images",verifyToken,async(req,res)=>{
   console.log("images")
    try {
        const file= req.files.image;
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath,{
            folder:"products"
        });
            res.status(201).json({ url: result.secure_url });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

app.post("/test",(req,res)=>{
   res.send("hey ")
})


 

app.listen(port, () => console.log(`Server running on port ${port}`));