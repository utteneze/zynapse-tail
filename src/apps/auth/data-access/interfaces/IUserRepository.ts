import StatusCode from '../../../../shared/interfaces/StatusCodes.js';
import { User } from '../../domain/entities/User.js';

/**
 * Represents a repository for managing user data.
 */
export interface IUserRepository {
    /**
     * Finds a user by their ID.
     * @param id - The ID of the user.
     * @returns A promise that resolves to the found user or null if not found.
     */
    findById(id: string): Promise<User | null>;

    /**
     * Finds a user by their email.
     * @param email - The email of the user.
     * @returns A promise that resolves to the found user or null if not found.
     */
    findByEmail(email: string): Promise<User | null>;

    /**
     * Persists a user.
     * @param user - The user to persist.
     * @returns A promise that resolves to the status code indicating the result of the operation.
     */
    persist(
        user: User
    ): Promise<StatusCode.INTERNAL_ERROR | StatusCode.CREATED>;

    /**
     * Merges a user.
     * @param user - The user to merge.
     * @returns A promise that resolves to the status code indicating the result of the operation.
     */
    merge(user: User): Promise<StatusCode.INTERNAL_ERROR | StatusCode.OK>;

    /**
     * Deletes a user by their entity.
     * @param user - The user to delete.
     * @returns A promise that resolves to the status code indicating the result of the operation.
     */
    remove(id: User): Promise<StatusCode.INTERNAL_ERROR | StatusCode.OK>;
}
