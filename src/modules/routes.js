import { Router } from 'express';
import { ProductRouter } from './products/router';

const routes = Router();

routes.use('/product', ProductRouter);

export default { routes };
