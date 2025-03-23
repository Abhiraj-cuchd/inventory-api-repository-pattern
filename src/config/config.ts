import dotenv from "dotenv";
dotenv.config();

export default {
    port: parseInt(process.env.PORT || '5000', 10),
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRE_IN || '1d',
    database: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/inventoryDB',
    }
}