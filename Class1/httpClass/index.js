const http = require("http");
// console.log(http);

const PORT = 8000;
const server = http.createServer((req, res) => {
  res.end("New requests recieved");
});

server.listen(PORT , (req , res) => {
    console.log(`Server is running on ${PORT}`)
})


