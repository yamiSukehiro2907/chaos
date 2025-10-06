const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./config/mongoDB.js");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(cookieParser());
app.use("/api/auth/", require("./routers/auth.route.js"));
app.use("/api/users/", require("./routers/user.route.js"));
app.use("/api/posts/" , require("./routers/post.route.js"));
app.use("/api/friends/" , require("./routers/follow.route.js"))


async function startServer() {
    await connectMongoDB()

    app.listen(port, () => {
        console.log(`Server is running at ${port}`);
    });
}

startServer().then(r => console.log());
