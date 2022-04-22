import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './createCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
  });

  it('should not be able to add a new specification to a car if car already exists', () => {
    expect(async () => {
      const car_id = '123';
      const specifications_id = ['153243'];

      await createCarSpecificationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name_Car_Specification',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ZMA-2167',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'categoryID',
    });

    const specifications_id = ['153243'];

    await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
  });
});
