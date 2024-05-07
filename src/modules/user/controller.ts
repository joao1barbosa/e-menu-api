import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../services/db';
import { errorHandler } from '../errors';
import bcryptjs from 'bcryptjs';
import { RequestWithUserData } from '../interfaces';

async function hashing(password: string) {
  const hashed = await bcryptjs.hash(password, 8);
  return hashed;
}

function defaultReturn(result: any){
  return result
    ?
      {
        id: result.id,
        name: result.name,
        email: result.email,
        restaurant: result.restaurant
      }
    :
      {
        errors: 'Usuário não encontrado',
      };
}

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const {
    name, email, password,
  } = req.body;

  try {
    const result = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await hashing(password),
      },
    });

    return res.status(201).json(
      {
        id: result.id,
        name: result.name,
        email: result.email
      });
  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};

export const getUserbyId = async (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
 ) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: Number(req.user?.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        restaurant: {
          select:{
            id: true,
            name: true,
          }
        },
      },
    });

    const statusCode = result ? 200 : 404;

    return res.status(statusCode).json(defaultReturn(result));

  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};

export const updateUser = async (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
 ) => {
  const { name, email, password } = req.body;

  try {
    const result = await prisma.user.update({
      where: {
        id: Number(req.user?.id),
      },
      data: {
        name,
        email,
        passwordHash: await hashing(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
        restaurant: {
          select:{
            id: true,
            name: true,
          }
        },
      },
    });

    const statusCode = result ? 200 : 404;

    return res.status(statusCode).json(defaultReturn(result));

  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};

export const deleteUser = async (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
 ) => {

  try {
    const result = await prisma.user.delete({
      where: {
        id: Number(req.user?.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        restaurant: {
          select:{
            id: true,
            name: true,
          }
        },
      },
    });

    const statusCode = result ? 200 : 404;

    return res.status(statusCode).json(defaultReturn(result));

  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};
