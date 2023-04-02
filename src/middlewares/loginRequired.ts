import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const loginRequired = async (
  req: Request,
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

    /*
      A ideia é atrelar o id e o email
      autenticados pelo token à requisição,
      porém o typescript acusa que esses atributos
      não existem na req. Irei consertar isto posteriormente
    */
    // req.userId = id;
    // req.userEmail = email;

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: 'Token expirado ou inválido.',
    });
  }
};
