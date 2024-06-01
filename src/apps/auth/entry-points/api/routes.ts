import { Router } from 'express';
import validateSchema from '../../../../shared/middlewares/validateSchema.js';
import { registerUserSchema } from './schema.js';
import { registerUserController } from './controller.js';

const router = Router();

router.get(
    '/signup',
    validateSchema(registerUserSchema),
    registerUserController
);

// cant right now, maybe later today

// do we need audio - ok
