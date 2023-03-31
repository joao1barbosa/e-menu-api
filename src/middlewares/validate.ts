import { AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject) => {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error: any) {
      return res.status(400).send(error.errors);
    }
  };
};
