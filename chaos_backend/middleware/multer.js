const multer = require("multer");
const path = require("path");
const fs = require("fs");


const dir = path.join(__dirname, "..", "public", "temp");

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
}

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, dir);
    }
    ,
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5}, // 5MB
});


module.exports = {upload};