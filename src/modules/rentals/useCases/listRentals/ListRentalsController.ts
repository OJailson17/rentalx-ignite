import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsUseCase } from './ListRentalsUseCase';

export class ListRentalsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const listRentalsUseCase = container.resolve(ListRentalsUseCase);

    const rentals = await listRentalsUseCase.execute(id);

    return res.json(rentals);
  }
}
