import { z } from 'zod';

export const createProductValidation = z.object({
  body: z.object({
    name: z.string()
      .min(3, { message: "Nome do produto muito curto" }),
    description: z.string()
      .min(5, { message: "Descrição muito curta" })
      .optional(),
    price: z.number()
      .positive({ message: "Preço deve ser um número positivo" })
      .finite({ message: "Preço deve ser um número finito" }),
  }),
});

export const idValidation = z.object({
  body: z.object({
    id: z.string(),
  }),
});

export const updateProductValidation = z.object({
  body: z.object({
    name: z.string()
      .min(3, { message: "Nome do produto muito curto" })
      .optional(),
    description: z.string()
      .min(5, { message: "Descrição muito curta" })
      .optional(),
    price: z.number()
      .positive({ message: "Preço deve ser um número positivo" })
      .finite({ message: "Preço deve ser um número finito" })
      .optional(),
  }),
});
