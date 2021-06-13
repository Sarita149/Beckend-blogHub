const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/BlogHub21",
    // process.env.DB_Connect, // access dotenv file use process.env.DB_Connect
    (err) => {
      if (!err) {
        console.log("DB Connected...");
      } else {
        console.log("Error" + JSON.stringify(null, undefined, 2));
      }
    }
  );

module.exports = mongoose;