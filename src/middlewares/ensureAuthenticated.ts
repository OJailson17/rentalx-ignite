import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET);
    console.log(sub);

    next();
  } catch {
    throw new Error('Invalid token');
  }
};
