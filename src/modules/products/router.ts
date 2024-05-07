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
import { upload } from '../../middlewares/upload';

const router = Router();

router
  .route('/')
  .post(loginRequired, upload.single('picture'), validate(createProductValidation), createProduct)
  .patch(loginRequired, upload.single('picture'), validate(updateProductValidation), updateProduct)
  .delete(loginRequired, deleteProduct);

router
  .route('/:id')
  .get(validate(idValidation), listProductByRestaurant);


export { router as ProductRouter };
