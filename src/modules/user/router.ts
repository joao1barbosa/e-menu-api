import { Router } from 'express';
import {
  createUser,
  getUserbyId,
  updateUser,
  deleteUser,
} from './controller';
import {
  createUserValidation,
  updateUserValidation,
} from './validations';
import { validate } from '../../middlewares/validate';
import { loginRequired } from '../../middlewares/loginRequired';

const router = Router();

router
  .route('/')
  .post(validate(createUserValidation), createUser)
  .patch(validate(updateUserValidation),loginRequired, updateUser)
  .delete(loginRequired, deleteUser);

export { router as UserRouter };
