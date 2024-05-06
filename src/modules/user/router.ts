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
import { loginRequired } from '../../middlewares/loginRequired';

const router = Router();

router
  .route('/')
  .post(validate(createUserValidation), createUser)
  .patch(validate(updateUserValidation),loginRequired, updateUser)
  .delete(validate(idValidation),loginRequired, deleteUser);

router
  .route('/:id')
  .get(validate(idValidation), loginRequired, getUserbyId);

export { router as UserRouter };
