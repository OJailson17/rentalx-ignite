import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test',
      description: 'Car Test Description',
      brand: 'Test Brand',
      fine_amount: 300,
      license_plate: 'FGK-1290',
      daily_rate: 30,
      category_id: 'Category_id',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car Test 2',
      description: 'Car Test Description',
      brand: 'Test Brand 1',
      fine_amount: 300,
      license_plate: 'FGG-1290',
      daily_rate: 30,
      category_id: 'Category_id',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Test Brand 1',
    });
  });
});
