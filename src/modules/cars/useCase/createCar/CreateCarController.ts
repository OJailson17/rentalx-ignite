import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarUseCase } from './CreateCarUseCase';

export class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createCarUseCase = container.resolve(CreateCarUseCase);

    // eslint-disable-next-line operator-linebreak
    const { name, description, brand, category_id, daily_rate, fine_amount, license_plate } =
      req.body;

    const car = await createCarUseCase.execute({
      name,
      description,
      brand,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
    });

    return res.status(201).json(car);
  }
}
