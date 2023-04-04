import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from '../errors';

const prisma = new PrismaClient();

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {
  const {
    name, description, price, restaurantID
  } = req.body;

  try {
    const result = await prisma.product.create({
      data: {
        name,
        description,
        price,
        restaurantID,
      },
    });

    return res.status(201).json(
      {
        id: result.id,
        name: result.name,
        restaurantID: result.restaurantID
      }
    )
  }catch(e){
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};

export const listProductByRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const result = await prisma.product.findMany({
      where: {
        restaurantID: Number(id),
      },
    });

    if (result === null){
    return res.status(404).json({
      errors: 'Nenhum produto encontrado para este Restaurante',
    });
    }
    if (result !== null){
      const productsList = result.map((obj) => {
        return {
          name: obj.name,
          description: obj.description,
          price: obj.price,
          picture: obj.picture,
        };
      });

      return res.status(200).json(productsList);
    }

  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { id } = req.params;
  const {
    name, description, price, restaurantID
  } = req.body;

};
