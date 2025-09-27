const cloudinary = require("cloudinary");
require("dotenv").config();

const configCloudinary = async () => {
  try {
    await cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (err) {
    console.error(err);
  }
};

const uploadCloudinary = async (file) => {
  try {
    const response = await cloudinary?.uploader.upload(file, {
      resource_type: "auto",
    });
    return response?.secure_url;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { configCloudinary, uploadCloudinary };
