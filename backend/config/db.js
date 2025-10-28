const mongoose = require('mongoose');
require('dotenv').config();
const MongoUrl = process.env.MONGO_URI;

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(MongoUrl,
         {
            dbName: "Ecomerce-Dashboard",
         }
      );

      console.log(`✔ Mongo Db Connected ${conn.connection.host}`);

   } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);    // Exit process with failure
   }

}

module.exports = connectDB;
