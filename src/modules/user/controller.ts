import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
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
    name, restaurantName, email, password,
  } = req.body;

  try {
    const result = await prisma.user.create({
      data: {
        name,
        restaurantName,
        email,
        passwordHash: await hashing(password),
      },
    });

    return res.status(201).json({
      id: result.id,
      name: result.name,
      restaurantName: result.restaurantName,
      email: result.email });
  } catch (error) {
    return next(error);
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
    });

    const statusCode = result ? 200 : 404;

    return res.status(statusCode).json(result ? {
      id: result.id,
      name: result.name,
      restaurantName: result.restaurantName,
      email: result.email }
    : null);
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const { id } = req.params;
  const { name, restaurantName, email } = req.body;

  try {
    const result = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        restaurantName,
        email,
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
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

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
