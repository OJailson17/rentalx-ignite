import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, process.env.JWT_SECRET);

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(String(user_id));

    if (!user) {
      throw new Error('User does not exists');
    }

    next();
  } catch {
    throw new Error('Invalid token');
  }
};
