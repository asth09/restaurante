import { z } from "zod";

export const registerSchema = z.object({
    usuario: z.string({
        required_error: 'El usuario es requerido'
    }),
    password: z.string({
        required_error: 'Contraseña requerida'
    }),
});

export const loginSchema = z.object({
    usuario: z.string({
        required_error: "Usuario requerido",
    }),
    password: z.string({
        required_error: "Contraseña requerida",
    }),
});