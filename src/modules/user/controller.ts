import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from '../errors';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function hashing(password) {
  const hashed = await bcryptjs.hash(password, 8);
  return hashed;
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
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const { id } = req.params;

  try {
    const result = await prisma.user.findFirst({
      where: {
        id: Number(id),
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

    return res.status(statusCode).json(result
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
    });
  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const { id } = req.params;
  const { name, email, password} = req.body;

  try {
    const result = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
        passwordHash: await hashing(password),
      },
    });

    return res.status(200).json({
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

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const { id } = req.params;

  try {
    const result = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      id: result.id,
      name: result.name,
      email: result.email,
    });
  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};
