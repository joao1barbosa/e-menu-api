import { AnyZodObject } from 'zod';
import { errorHandler } from '../modules/errors';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: AnyZodObject) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (e: any) {
      return res.status(400).json({
        errors: errorHandler(e.errors[0]),
      });
    }
  };
};
