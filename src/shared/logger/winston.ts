import winston, { format } from 'winston';

const { combine, timestamp, printf } = format;

const logger = winston.createLogger({
    level: 'info',
    // Todo: add transports for production here
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
});

const devLogFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp}: ${level}: ${message}`;
});

if (process.env.NODE_ENV === 'development') {
    logger.configure({
        level: 'debug',
        format: combine(winston.format.colorize(), timestamp(), devLogFormat),
        transports: [new winston.transports.Console()],
    });
}

export default logger;
