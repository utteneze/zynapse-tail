import { Request } from 'express';
import { z } from 'zod';

const registerUserSchema = {
    bodySchema: z
        .object({
            username: z.string().min(3).max(16),
            email: z.string().email(),
            password: z
                .string()
                .min(8)
                .max(32)
                .refine(
                    (password) => {
                        return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(
                            password
                        );
                    },
                    {
                        message:
                            'Password must contain at least one digit, one lowercase and one uppercase letter',
                    }
                ),
        })
        .strict(),
};

type RegisterUserBody = z.infer<typeof registerUserSchema.bodySchema>;
type RegisterUserRequest = Request<any, any, RegisterUserBody, any>;
export { registerUserSchema, RegisterUserRequest };
