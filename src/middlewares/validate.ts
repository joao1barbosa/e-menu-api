import { AnyZodObject } from 'zod';
import { errorHandler } from '../modules/errors';

export const validate = (schema: AnyZodObject) => {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (e) {
      return res.status(400).json({
        errors: errorHandler(e.errors[0]),
      });
    }
  };
};
