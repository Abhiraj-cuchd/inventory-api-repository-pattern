import mongoose from "mongoose";
import config from '../../config/config';
import logger from '../../config/logger';

export class MongoDBConnection {
    private static instance: MongoDBConnection;

    private constructor() {}

    // @ts-ignore
    public static getInstance(): MongoDBConnection {
        if (!MongoDBConnection.instance) {
            MongoDBConnection.instance = new MongoDBConnection();
        }
        return MongoDBConnection.instance;
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(config.database.uri);
            logger.info(`MongoDB Connected successfully.`);
        } catch (error: any) {
            logger.fatal(error.message.toString());
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        await mongoose.disconnect();
    }
}

