'use strict';

import logger from '../../shared/logger/winston';
import env from '../config/environment';
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.DATABASE_URL);
        logger.info(
            `🍃 [database] Established connection with MongoDB @ ${conn.connection.host}`
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error(`🍃 [database]  ${error.message}`);
        }
        logger.warn('Are you sure MongoDB is running?');
        process.exit(1);
    }
};

export default connectDB;
