import mongoose, { Document, Schema } from 'mongoose';
import { UserAttributes } from '@apps/auth/domain/entities/User.js';

interface UserDocument extends Document, UserAttributes {}

const userSchema = new Schema<UserDocument>(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            id: {
                type: String,
                required: true,
            },
            otp: String,
            isVerified: {
                type: Boolean,
                default: false,
            },
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model<UserDocument>('User', userSchema);
export default UserModel;

export { UserDocument };
