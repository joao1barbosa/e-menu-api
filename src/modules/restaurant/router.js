import { Router } from 'express';
import {
  createRestaurant,
  getRestaurantbyId,
  updateRestaurant,
  deleteRestaurant,
} from './controller';
import {
  createRestaurantValidation,
  idValidation,
  updateRestaurantValidation,
} from './validations';
import { validate } from '../../middlewares/validate';

const router = Router();

router
  .route('/')
  .post(validate(createRestaurantValidation), createRestaurant);

router
  .route('/:id')
  .get(validate(idValidation), getRestaurantbyId)
  .patch(validate(updateRestaurantValidation), updateRestaurant)
  .delete(validate(idValidation), deleteRestaurant);

export { router as UserRouter };
