import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCarsUseCase } from './ListCarsUseCase';

export class ListCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, category_id } = req.query;

    const listCarsUseCase = container.resolve(ListCarsUseCase);

    const cars = await listCarsUseCase.execute({
      category_id: category_id as string,
      name: name as string,
      brand: brand as string,
    });

    return res.json(cars);
  }
}
