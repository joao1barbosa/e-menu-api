import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from '../errors';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function passwordIsValid(reqPassword, userPassword) {
  return await bcryptjs.compare(reqPassword, userPassword);
}

export const createToken = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const { email = '', password = '' } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      errors: 'Credenciais inválidas',
    });
  }

  try {
    const result = await prisma.user.findFirst({
      where: {
        email: email,
      }
    });
    if (result !== null){
      if (!(await passwordIsValid(password, result.passwordHash))) {
        return res.status(401).json({
          errors: 'Senha inválida',
        })
      }

      const id = result.id;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json({ token });
    }else{
      return res.status(404).json({
        errors: 'Usuário não existe'
      })
    }
  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }

};
