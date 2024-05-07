import { Request, Response, NextFunction } from 'express';
import { RequestWithUserData } from '../interfaces';
import { prisma } from '../../services/db';
import { errorHandler } from '../errors';

const url = `${process.env.URL}:${process.env.PORT}/`;

export const createProduct = async (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
 ) => {
  const {
    name, description, price
  } = req.body;

  if(!req.user?.restaurant){
    return res.status(404).json({
      errors: 'É necessário criar um restaurante antes de adicionar produtos',
    });
  }

  try {
    const result = await prisma.product.create({
      data: {
        name,
        description,
        price,
        picture: req.file?.path.replace('\\', '/'),
        restaurantId: Number(req.user?.restaurant)
      },
    });

    return res.status(201).json({
      id: result.id,
      name: result.name,
      picture: url + result.picture,
      restaurantId: result.restaurantId
      });
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
        restaurantId: Number(id),
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        picture: true
      },
    });

    if (result === null){
      return res.status(404).json({
        errors: 'Nenhum produto encontrado para este Restaurante',
      });
    }

    const productsList = result.map((obj) => {
      return {
        id: obj.id,
        name: obj.name,
        description: obj.description,
        price: obj.price,
        picture: url + obj.picture,
      };
    });

    return res.status(200).json(productsList);

  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};

export const updateProduct = async (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
) => {

  const {
    id, name, description, price
  } = req.body;

  try {
    const result = await prisma.product.update({
      where: {
        id,
        restaurantId: Number(req.user?.restaurant),
      },
      data: {
        name,
        description,
        price,
        picture: req.file?.path.replace('\\', '/'),
      },
    });

    return res.status(200).json({
      id: result.id,
      name: result.name,
      description: result.description,
      price: result.price,
      picture: url + result.picture,
    });

  }catch(e){
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};

export const deleteProduct = async (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
 ) => {
  const { id } = req.body;

  try {
    const result = await prisma.product.delete({
      where: {
        id,
        restaurantId: Number(req.user?.restaurant),
      },
    });

    return res.status(200).json({
      id: result.id,
      name: result.name,
      description: result.description,
      price: result.price,
      picture: url + result.picture,
    });
  } catch (e) {
    return res.status(400).json({
      errors: errorHandler(e),
    });
  }
};
