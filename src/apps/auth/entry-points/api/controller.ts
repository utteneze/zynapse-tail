import { Response } from 'express';
import { RegisterUser } from '@apps/auth/domain/services/RegisterUser';
import { RegisterUserRequest } from './schema';
import UserRepositoryMongoose from '@apps/auth/data-access/implementations/UserRepositoryMongoose';
import asyncHandler from 'express-async-handler';

const userRepository = new UserRepositoryMongoose();

export const RegisterUserController = asyncHandler(_RegisterUserController);
async function _RegisterUserController(
    req: RegisterUserRequest,
    res: Response
) {
    const { username, email, password } = req.body;

    const interactor = new RegisterUser({ userRepository });
    const result = await interactor.execute({ username, email, password });

    res.json(result);
}
