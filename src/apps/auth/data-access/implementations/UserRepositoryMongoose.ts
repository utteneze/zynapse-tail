import StatusCode from '../../../../shared/interfaces/StatusCodes.js';
import { User } from '../../domain/entities/User.js';
import { IUserRepository } from '../interfaces/IUserRepository.js';
import UserModel, { UserDocument } from '../../data-access/models/UserModel.js';

export default class UserRepositoryMongoose implements IUserRepository {
    async findById(id: string): Promise<User | null> {
        try {
            const user = await UserModel.findById(id).lean();
            return this.mapToEntity(user);
        } catch (err) {
            console.error('Error finding user by id:', err);
            return null;
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const user = await UserModel.findOne({ 'email.id': email }).lean();
            return this.mapToEntity(user);
        } catch (err) {
            console.error('Error finding user by email:', err);
            return null;
        }
    }

    async persist(
        user: User
    ): Promise<StatusCode.INTERNAL_ERROR | StatusCode.CREATED> {
        try {
            await UserModel.create(user);
            return StatusCode.CREATED;
        } catch (err) {
            console.error('Error persisting user:', err);
            return StatusCode.INTERNAL_ERROR;
        }
    }

    async merge(
        user: User
    ): Promise<StatusCode.INTERNAL_ERROR | StatusCode.OK> {
        try {
            await UserModel.findOneAndUpdate(
                { 'email.id': user.email.id },
                user
            );
            return StatusCode.OK;
        } catch (error) {
            console.error('Error merging user:', error);
            return StatusCode.INTERNAL_ERROR;
        }
    }

    async remove(
        user: User
    ): Promise<StatusCode.INTERNAL_ERROR | StatusCode.OK> {
        try {
            await UserModel.findOneAndDelete(
                { 'email.id': user.email.id },
                user
            );
            return StatusCode.OK;
        } catch (error) {
            console.error('Error removing user:', error);
            return StatusCode.INTERNAL_ERROR;
        }
    }

    private mapToEntity(mongooseEntity: UserDocument | null): User | null {
        if (!mongooseEntity) return null;

        const entity = new User({
            username: mongooseEntity.username,
            email: {
                id: mongooseEntity.email.id,
                otp: mongooseEntity.email.otp,
                isVerified: mongooseEntity.email.isVerified,
            },
            password: mongooseEntity.password,
        });

        return entity;
    }
}
