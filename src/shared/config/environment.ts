import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']),
    PORT: z.coerce.number(),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(8),
    FRONTEND_URL: z.string().url(),
});

export default (() => {
    console.log('[env] Environment variables have been injected from `.env`');
    const validatedEnv = envSchema.safeParse(process.env);
    if (!validatedEnv.success) {
        throw new Error(
            `Invalid environment variables: ${validatedEnv.error.message}`
        );
        process.exit(1);
    }
    console.log(
        '[env] Environment variables have been validated successfully.'
    );

    const env = {
        /** The current environment of the Node.js application. (development / production) */
        NODE_ENV: validatedEnv.data.NODE_ENV,
        /** The port number which the Express.js server listens on. */
        PORT: Number(validatedEnv.data.PORT),
        /** The connection URL of MongoDB database. */
        DATABASE_URL: validatedEnv.data.DATABASE_URL,
        /** Secret to sign the access token with. */
        JWT_SECRET: validatedEnv.data.JWT_SECRET,
        /** The URL of the frontend. */
        FRONTEND_URL: validatedEnv.data.FRONTEND_URL,
    };

    return env;
})();
