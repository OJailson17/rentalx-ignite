import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './createCarSpecificationUseCase';

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { specifications_id } = req.body;

    const createCaeSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

    const cars = await createCaeSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return res.json(cars);
  }
}
