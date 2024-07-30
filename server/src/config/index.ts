import dotenv from "dotenv";
dotenv.config();

module.exports = {
    port: process.env.PORT || 5000,
    environment: process.env.NODE_ENV || "development",
    dbURI: process.env.MONGODB_URI
};