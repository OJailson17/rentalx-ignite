import { IRentalsRepository } from '@modules/rentals/repositories/IRentalRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({ car_id, user_id, expected_return_date }: IRequest) {
    const carAvailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (!carAvailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError('There is rental in progress for this user');
    }
  }
}
