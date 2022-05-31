import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
// import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository';
import { AppError } from '@shared/errors/AppError';

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  const usersTokenRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret_refresh_token);

    // const usersRepository = new UsersRepository();
    const user = await usersTokenRepository.findByUserIdAndRefreshToken(String(user_id), token);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    req.user = {
      id: String(user_id),
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
};
