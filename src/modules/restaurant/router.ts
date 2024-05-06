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
import { loginRequired } from '../../middlewares/loginRequired';

const router = Router();

router
  .route('/')
  .post(validate(createRestaurantValidation), loginRequired, createRestaurant)
  .patch(validate(updateRestaurantValidation),loginRequired, updateRestaurant)
  .delete(loginRequired, deleteRestaurant);

router
  .route('/:id')
  .get(validate(idValidation), getRestaurantbyId);

export { router as RestaurantRouter };
