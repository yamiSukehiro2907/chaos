const express = require("express");
const connectMongoDB = require("./config/mongoDB.js");
require("dotenv").config();

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth/", require("./routers/userRoute.js"));

async function startServer() {
   await connectMongoDB();

  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
}

startServer();
