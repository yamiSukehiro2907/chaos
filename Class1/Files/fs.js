const fs = require("fs");

// readFile
console.log("readFile");
fs.readFile("f1.txt", function (err, data) {
  console.log(data + "");
});

// readFileSync
console.log("readFileSync");
let data1 = fs.readFileSync("f2.txt");
console.log(data1 + "");

// writeFile
console.log("writeFile");
fs.writeFile("write1.txt", "Hi I am write1 file", function (err, data) {
  if (err) {
    console.log(err);
  }
  console.log("File created");
});
