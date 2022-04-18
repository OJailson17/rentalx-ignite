import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'name car',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'FGH-1020',
      fine_amount: 60,
      brand: 'brand',
      category_id: 'categoryID',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with an existing license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'name car 2',
        description: 'description car 2',
        daily_rate: 200,
        license_plate: 'FGH-1020',
        fine_amount: 70,
        brand: 'brand',
        category_id: 'categoryID',
      });

      await createCarUseCase.execute({
        name: 'name car 3',
        description: 'description car 3',
        daily_rate: 200,
        license_plate: 'FGH-1020',
        fine_amount: 70,
        brand: 'brand',
        category_id: 'categoryID',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new car with already available by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'name car available',
      description: 'description car 2',
      daily_rate: 200,
      license_plate: 'ABC-1020',
      fine_amount: 70,
      brand: 'brand',
      category_id: 'categoryID',
    });

    expect(car.available).toBe(true);
  });
});
