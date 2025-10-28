const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, trim:true },
    profileImg: { type: String, default: "" },
    role: {type:String, enum:["customer","vendor","admin"]},
    isAllowed:{type:Boolean}
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
