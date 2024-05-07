import { Response, NextFunction } from 'express';
import { RequestWithUserData } from '../interfaces';
import { prisma } from '../../services/db';
import { errorHandler } from '../errors';

export const createRestaurant = async (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
 ) => {
  const userId = Number(req.user?.id);

  const { name } = req.body;

  try {
    const result = await prisma.restaurant.create({
      data: {
        name,
        userId,
        picture: req.file?.path.replace('\\', '/')
      },
    });

    return res.status(201).json(
      {
        id: result.id,
        name: result.name,
        userId: result.userId,
        picture: result.picture
      });
  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};

export const getRestaurantbyId = async (
  req: RequestWithUserData,
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
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
 ) => {
  const { name } = req.body;

  try {
    const result = await prisma.restaurant.update({
      where: {
        userId: Number(req.user?.id),
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
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
 ) => {

  try {
    const result = await prisma.restaurant.delete({
      where: {
        userId: Number(req.user?.id),
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
