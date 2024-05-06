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
import { loginRequired } from '../../middlewares/loginRequired';

const router = Router();

router
  .route('/')
  .post(validate(createProductValidation),loginRequired, createProduct)
  .patch(validate(updateProductValidation), loginRequired, updateProduct)
  .delete(validate(idValidation), loginRequired, deleteProduct);

router
  .route('/:id')
  .get(validate(idValidation), listProductByRestaurant);


export { router as ProductRouter };
