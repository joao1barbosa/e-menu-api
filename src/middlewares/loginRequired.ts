import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

interface RequestWithUserData extends Request {
  userId?: string;
  userEmail?: string;
}

const prisma = new PrismaClient();

export const loginRequired = async (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: 'Necessário fazer login.',
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const result = await prisma.user.findFirst({
      where: {
        id,
        email
      }
    });

    if (result !== null) {
      return res.status(401).json({
        errors: 'Usário inválido',
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: 'Token expirado ou inválido.',
    });
  }
};
