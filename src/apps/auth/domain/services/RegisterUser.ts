import { IUseCase } from '../../../../shared/interfaces/IUseCase.js';
import StatusCode from '../../../../shared/interfaces/StatusCodes.js';
import { AppError } from '../../../../shared/webserver/AppError.js';
import { IUserRepository } from '../../data-access/interfaces/IUserRepository.js';
import { User } from '../entities/User.js';

type Input = {
    username: string;
    email: string;
    password: string;
};

type Output = {
    message: string;
    success: boolean;
};

type Dependencies = {
    userRepository: IUserRepository;
};

export class RegisterUser implements IUseCase<Input, Output> {
    public constructor(private readonly dependencies: Dependencies) {}

    public async execute(input: Input): Promise<Output> {
        const { userRepository } = this.dependencies;
        const { username, email, password } = input;

        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new AppError('Invalid credentials.', StatusCode.BAD_REQUEST);
        }

        const user = new User({
            username,
            email: { id: email, isVerified: false },
            password,
        });

        const createdUserStatus = await userRepository.persist(user);
        if (createdUserStatus !== StatusCode.CREATED) {
            throw new AppError('An internal error occured.', createdUserStatus);
        }

        return {
            message: 'User created successfully',
            success: true,
        };
    }
}
