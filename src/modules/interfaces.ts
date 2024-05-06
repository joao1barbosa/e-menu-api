import { Request } from 'express';

export interface RequestWithUserData extends Request {
  user?: {
    id?: string;
    email?: string;
    restaurant?: string;
  }
}
