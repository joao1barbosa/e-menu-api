import { Router } from 'express';
import {
  createUser,
  getUserbyId,
  updateUser,
  deleteUser,
} from './controller';
import {
  createUserValidation,
  idValidation,
  updateUserValidation,
} from './validations';
import { validate } from '../../middlewares/validate';

const router = Router();

router
  .route('/')
  .post(validate(createUserValidation), createUser);

router
  .route('/:id')
  .get(validate(idValidation), getUserbyId)
  .patch(validate(updateUserValidation), updateUser)
  .delete(validate(idValidation), deleteUser);

export { router as UserRouter };
