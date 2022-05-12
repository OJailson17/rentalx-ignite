import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  const addOneDay = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '121212',
      user_id: '123456',
      expected_return_date: addOneDay,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if the user has an open rent', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '121212',
        user_id: '123456',
        expected_return_date: addOneDay,
      });

      await createRentalUseCase.execute({
        car_id: '121212',
        user_id: '123456',
        expected_return_date: addOneDay,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new rental if there is an open rent to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '121212',
        user_id: 'test_car',
        expected_return_date: addOneDay,
      });

      await createRentalUseCase.execute({
        car_id: '121212',
        user_id: 'test_car',
        expected_return_date: addOneDay,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '121212',
        user_id: 'test_car',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
