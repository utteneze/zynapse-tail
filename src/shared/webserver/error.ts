import { AppError } from './AppError';
import { Request, Response } from 'express';
import notifier from 'node-notifier';

export const errorMiddleware = (err: AppError, req: Request, res: Response) => {
    console.error('===APP ERROR===');
    console.error(err);
    console.log('\n\n');

    if (err.isCatastrophic) {
        notifier.notify({
            title: 'Server has been shut down.',
            message: `A catastrophic error has occured: ${err.name}`,
            icon: 'logo.png',
        });

        res.status(500).json({ error: 'Internal Server Error' });
        console.log('╔═╗╦  ╔═╗╦═╗╔╦╗');
        console.log('╠═╣║  ║╣ ╠╦╝ ║ ');
        console.log('╩ ╩╩═╝╚═╝╩╚═ ╩ ');
        console.error(err.name);
        console.error(`\t -${err.message}`);
        console.log(
            'Error is of catastrophic nature. Imminent server shut down to prevent snowballing.'
        );
        process.exit(1);
    }

    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
