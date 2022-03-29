import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, process.env.JWT_SECRET);

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(String(user_id));

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
};
