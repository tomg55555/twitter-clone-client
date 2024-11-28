import { z } from "zod";

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])$/
);

export const userSchema = z.object({
    username: z.string().min(1).max(50),
    email: z.string().email("email non valida"),
    password: z.string().min(8, "La password deve avere almeno 8 caratteri"),
    confirmPassword:  z.string().min(8),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Le password non corrispondono",
            path: ['confirmPassword']
        });
    }
});

export const loginSchema = z.object({
    username: z.string().min(1, "Inserisci username"),
    password: z.string().min(1, "Inserisci password")
});

export const messageSchema = z.object({
    message: z.string().min(1).max(100)
})

export const commentSchema = z.object({
    message: z.string().min(1).max(256)
})