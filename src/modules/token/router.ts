import { Router } from 'express';
import { createToken } from './controller';

const router = Router();

router.post('/', createToken);

export { router as TokenRouter };
