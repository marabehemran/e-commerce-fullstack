const mongoose = require("mongoose");

async function dbConnection() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected To mongodb");
  } catch(error) {
    console.log("Connected faild to mongodb!", error);
  }
}


module.exports=dbConnection;