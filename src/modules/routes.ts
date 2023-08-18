import { Router } from 'express';
import { ProductRouter } from './products/router';
import { RestaurantRouter } from './restaurant/router';
import { TokenRouter } from './token/router';
import { UserRouter } from './user/router';

const routes = Router();

routes.use('/product', ProductRouter);
routes.use('/restaurant', RestaurantRouter);
routes.use('/token', TokenRouter);
routes.use('/user', UserRouter);

export default routes;
