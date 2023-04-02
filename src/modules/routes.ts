import { Router } from 'express';
import { ProductRouter } from './products/router';
import { UserRouter } from './user/router';
import { TokenRouter } from './token/router';

const routes = Router();

// routes.use('/product', ProductRouter);
routes.use('/user', UserRouter);
routes.use('/token', TokenRouter);

export default routes;
