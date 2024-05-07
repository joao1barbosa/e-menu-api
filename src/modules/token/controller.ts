import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../services/db';
import { errorHandler } from '../errors';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function passwordIsValid(reqPassword: string, userPassword: string) {
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
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select:{
        id: true,
        passwordHash: true,
        restaurant: true
      }
    });

    if (!result){
      return res.status(404).json({
        errors: 'Usuário não existe'
      });
    }

    if (!(await passwordIsValid(password, result.passwordHash))) {
      return res.status(401).json({
        errors: 'Senha inválida',
      })
    }

    const { id } = result;
    const restaurant = result.restaurant?.id;

    const token = jwt.sign({ id, email, restaurant }, process.env.TOKEN_SECRET || '', {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.status(200).json({ token });

  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }

};
