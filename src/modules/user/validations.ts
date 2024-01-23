import { z } from 'zod';

export const createUserValidation = z.object({
  body: z.object({
    name: z.string()
      .min(3, { message: "Nome muito curto" }),
    email: z.string()
      .email({ message: "Email inválido" }),
    password: z.string()
      .min(6, { message: "Senha deve ter entre 6 e 20 caracteres" })
      .max(20, { message: "Senha deve ter entre 6 e 20 caracteres" }),
  }),
});

export const idValidation = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const updateUserValidation = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string()
      .min(3, { message: "Nome muito curto" })
      .optional(),
    email: z.string()
      .email({ message: "Email inválido" })
      .optional(),
    password: z.string()
      .min(6, { message: "Senha deve ter entre 6 e 20 caracteres" })
      .max(20, { message: "Senha deve ter entre 6 e 20 caracteres" })
      .optional(),
  }),
});
