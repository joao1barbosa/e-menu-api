import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface RequestWithUserData extends Request {
  user?: {
    id?: string;
    email?: string;
    restaurant?: string;
  };
  file?: {
    path: string;
  };
};
