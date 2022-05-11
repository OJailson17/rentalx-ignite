import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {
    const carUnAvailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnAvailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError('There is rental in progress for this user');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}
