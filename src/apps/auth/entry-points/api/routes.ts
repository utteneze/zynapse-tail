import { Router } from 'express';
import validateSchema from '@shared/middlewares/validateSchema';
import { registerUserSchema } from './schema';
import { RegisterUserController } from './controller';

const router = Router();

router.get(
    '/signup',
    validateSchema(registerUserSchema)
    // RegisterUserController
);
