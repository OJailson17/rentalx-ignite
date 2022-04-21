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

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car_Name',
      description: 'Car Test Description',
      brand: 'Test Brand 1',
      fine_amount: 300,
      license_plate: 'FGG-1299',
      daily_rate: 30,
      category_id: 'Category_id',
    });

    const cars = await listCarsUseCase.execute({
      name: 'Car_Name',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car_Name_Category',
      description: 'Car Test Description',
      brand: 'Test Brand 1',
      fine_amount: 300,
      license_plate: 'FGG-1499',
      daily_rate: 30,
      category_id: 'Category_id_Test',
    });

    const cars = await listCarsUseCase.execute({
      category_id: 'Category_id_Test',
    });

    expect(cars).toEqual([car]);
  });
});
