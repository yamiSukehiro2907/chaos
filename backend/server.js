const express = require("express");
const connectmongoDB = require("./config/mongoDB");
require("dotenv").config();

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth/" , require("./routers/userRoute"))

async function startServer() {
  await connectmongoDB();

  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
}

startServer();
