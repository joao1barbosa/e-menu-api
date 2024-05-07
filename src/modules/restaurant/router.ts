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
import { upload } from '../../middlewares/upload';

const router = Router();

router
  .route('/')
  .post(loginRequired, upload.single('picture'), validate(createRestaurantValidation), createRestaurant)
  .patch(loginRequired, upload.single('picture'), validate(updateRestaurantValidation), updateRestaurant)
  .delete(loginRequired, deleteRestaurant);

router
  .route('/:id')
  .get(validate(idValidation), getRestaurantbyId);

export { router as RestaurantRouter };
