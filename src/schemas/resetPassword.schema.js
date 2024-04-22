import { z } from 'zod';

export const forgotPasswordSchema = z.object({
    email: z.string({
        required_error: "Email is not valid",
    }).email({
        message: "Invalid email"
    })
});

export const resetPasswordSchema = z.object({
    password: z.string({
        required_error: "New password is required"
    }).min(6, {
        message: "Password must be at least 6 characters"
    })
})