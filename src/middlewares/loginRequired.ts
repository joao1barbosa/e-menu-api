import { Request, Response, NextFunction } from 'express';
import { RequestWithUserData } from '../modules/interfaces';
import { prisma } from '../services/db';
import jwt from 'jsonwebtoken';

export const loginRequired = async (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: 'Missing authorization header',
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email, restaurant } = dados;

    const result = await prisma.user.findUnique({
      where: {
        id: id,
        email: email
      },
      select:{
        id: true,
      }
    });

    if (!result) {
      return res.status(401).json({
        errors: 'Usário inválido',
      });
    }

    req.user = {
      id: id,
      email: email,
      restaurant: restaurant
    };

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: 'Token expirado ou inválido.',
    });
  }
};
