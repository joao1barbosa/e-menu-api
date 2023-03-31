import { Router } from 'express';
import { ProductRouter } from './products/router';
import { UserRouter } from './user/router';

const routes = Router();

// routes.use('/product', ProductRouter);
routes.use('/user', UserRouter);

export default routes;
