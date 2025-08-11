const http = require("http");
const fs = require("fs");
// console.log(http);

const PORT = 8000;
const server = http.createServer((req, res) => {
  let log = `${Date.now()} : ${req.rawHeaders} New Req Recieved\n`;
  fs.appendFileSync("log.txt", log);
  switch (req.url) {
    case "/": {
      res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
Home Page
<body>
    
</body>
</html>`);
      break;
    }
    case "/about": {
      res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
About page
<body>
    
</body>
</html>`);
      break;
    }
    default: {
      res.end("Endpoint does not exist");
      break;
    }
  }
});

server.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`);
});
