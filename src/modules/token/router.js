import { Router } from 'express';
import { createToken } from './controller';

const router = new Router();

router.post('/', createToken);

export { router as TokenRouter };
