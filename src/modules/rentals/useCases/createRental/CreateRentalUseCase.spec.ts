import dayjs from 'dayjs';

import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const addOneDay = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Cat for Test',
      description: 'Car test',
      daily_rate: 100,
      license_plate: 'TEST_123',
      brand: 'Brand Teste',
      category_id: '8u98eu9j',
      fine_amount: 30,
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '123456',
      expected_return_date: addOneDay,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if the user has an open rent', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'j9039029',
      expected_return_date: addOneDay,
      user_id: '123456',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '121212',
        user_id: '123456',
        expected_return_date: addOneDay,
      }),
    ).rejects.toEqual(new AppError('There is rental in progress for this user'));
  });

  it('should not be able to create a new rental if there is an open rent to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'j9039029',
      expected_return_date: addOneDay,
      user_id: '123456',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: 'j9039029',
        user_id: 'test_car',
        expected_return_date: addOneDay,
      }),
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '121212',
        user_id: 'test_car',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Invalid return date!'));
  });
});
