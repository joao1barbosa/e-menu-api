import { Request, Response, NextFunction } from 'express';
import { RequestWithUserData } from '../interfaces';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from '../errors';

const prisma = new PrismaClient();

export const createRestaurant = async (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
 ) => {
  const user  = req.userId;

  if(!user){
    return { errors: "Token sem usuário"}
  }

  const userId = Number(user);

  const { name } = req.body;

  try {
    const result = await prisma.restaurant.create({
      data: {
        name,
        userId,
      },
    });

    return res.status(201).json(
      {
        id: result.id,
        name: result.name,
        userId: result.userId
      });
  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};

export const getRestaurantbyId = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const { id } = req.params;

  try {
    const result = await prisma.restaurant.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        userId: true,
      },
    });

    const statusCode = result ? 200 : 404;

    return res.status(statusCode).json(result
    ?
      {
        id: result.id,
        name: result.name,
        userId: result.userId
      }
    :
    {
      errors: 'Restaurante não encontrado',
    });
  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};

export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await prisma.restaurant.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
      select:{
        id: true,
        name: true,
        userId: true,
      }
    });

    return res.status(200).json({
      id: result.id,
      name: result.name,
      userId: result.userId
    });

  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};

export const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const { id } = req.params;

  try {
    const result = await prisma.restaurant.delete({
      where: {
        id: Number(id),
      },
      select:{
        id: true,
        name: true,
        userId:true,
      }
    });

    return res.status(200).json({
      id: result.id,
      name: result.name,
      userId: result.userId
    });
  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};
