import { Router } from 'express';
import {
  createProduct,
  listProductByRestaurant,
  updateProduct,
  deleteProduct,
} from './controller';
import {
  createProductValidation,
  idValidation,
  updateProductValidation,
} from './validations';
import { validate } from '../../middlewares/validate';

const router = Router();

router
  .route('/')
  .post(validate(createProductValidation), createProduct);

router
  .route('/:id')
  .get(validate(idValidation), listProductByRestaurant)
  .patch(validate(updateProductValidation), updateProduct)
  .delete(validate(idValidation), deleteProduct);

export { router as ProductRouter };
