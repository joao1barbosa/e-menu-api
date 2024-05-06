import { Request } from 'express';

export interface RequestWithUserData extends Request {
  userId?: string;
  userEmail?: string;
}
