import { Router } from 'express';
import validateSchema from '@shared/middlewares/validateSchema.js';
import { registerUserSchema } from './schema.js';
import { RegisterUserController } from './controller.js';

const router = Router();

router.get(
    '/signup',
    validateSchema(registerUserSchema)
    // RegisterUserController(req, res)
);
