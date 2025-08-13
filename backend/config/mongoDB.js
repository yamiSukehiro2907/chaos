const mongoose = require("mongoose");
require("dotenv").config();

const connectmongoDB = async (req, res) => {
  console.log("Trying to connect to mongoDb database...");
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "MongoDB database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.error("Error connecting to mongoDB database: ", err);
    process.exit(1);
  }
};

module.exports = connectmongoDB