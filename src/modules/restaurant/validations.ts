import { z } from 'zod';

export const createRestaurantValidation = z.object({
  body: z.object({
    name: z.string()
      .min(3, { message: "Nome muito curto" }),
  }),
});

export const idValidation = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const updateRestaurantValidation = z.object({
  body: z.object({
    name: z.string()
      .min(3, { message: "Nome muito curto" })
      .optional(),
  }),
});
