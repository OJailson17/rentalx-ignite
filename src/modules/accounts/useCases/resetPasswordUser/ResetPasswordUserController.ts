import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase';

export class ResetPasswordUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.query;
    const { password } = req.body;

    const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase);

    await resetPasswordUserUseCase.execute({
      token: token as string,
      password,
    });

    return res.send();
  }
}
