import express, { Express } from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import ratelimit from 'express-rate-limit';
import { Server } from '../interfaces/IServer';
import env from '../config/environment';

import { errorMiddleware } from './error';
import nocache from 'nocache';

/**
 * Create an Express.js based server instance.
 */
export class ExpressServer implements Server {
    private app: Express;
    private port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();

        this.initializeCORS();
        this.initializeRatelimits();
        this.initializeMiddlewares();
        this.app.use(nocache());
        this.initializeRoutes();
        this.initializeErrorHandler();
    }

    /** Setup express.js specific configurations and middlewares. */
    private initializeMiddlewares() {
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        if (env.NODE_ENV === 'development') {
            this.app.use(logger('dev'));
        }
    }

    /** Setup the touch points where data flows to. */
    private initializeRoutes() {
        this.app.use('/', () => console.log('hello darkness my old friend.'));
    }

    /** Setup handlers to deal with errors. */
    private initializeErrorHandler() {
        // todo: apply error handler.
        this.app.use(errorMiddleware);
    }

    /** Setup CORS based configurations using the middleware. */
    private initializeCORS() {
        const corsOptions = {
            //! React Frontend Port
            origin: '*',
            // credentials: true,
            optionsSuccessStatus: 200,
        };
        // this.app.use(cors(corsOptions));
        this.app.use('*', cors(corsOptions));
    }

    /** Setup API ratelimiting. */
    private initializeRatelimits() {
        // todo: This should be readjusted later.
        const limiter = ratelimit({
            windowMs: 2 * 60 * 1000,
            max: 100,
        });

        this.app.use(limiter);
    }

    /**
     * Start the server on the predefined port.
     * @param callback A callback function on success.
     */
    public async run(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}
