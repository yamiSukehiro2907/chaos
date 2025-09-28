const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

const requiredEnvVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error("Missing required Cloudinary environment variables:", missingEnvVars);
    process.exit(1);
}

try {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Cloudinary configured successfully.");
    console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
} catch (error) {
    console.error("Failed to configure Cloudinary:", error);
    process.exit(1);
}

const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("No local file path provided.");
        }

        if (!fs.existsSync(localFilePath)) {
            throw new Error(`File not found: ${localFilePath}`);
        }

        console.log("Uploading to Cloudinary:", localFilePath);

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "profile_pictures",
        });

        console.log("Upload successful. URL:", response.secure_url);

        fs.unlinkSync(localFilePath);

        return response.secure_url;

    } catch (err) {
        console.error("Cloudinary upload error details:", err);

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        throw err;
    }
};

module.exports = {uploadCloudinary};