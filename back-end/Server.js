const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const passport = require("passport");
const session = require("express-session"); 
require("./middleware/googleauth"); 
const Product = require("./models/productModel")


dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
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





 

app.listen(port, () => console.log(`Server running on port ${port}`));