import { instanceToInstance } from 'class-transformer';

import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';

export class UserMap {
  static toDTO({ name, email, id, avatar, driver_license, avatar_url }: User): IUserResponseDTO {
    const user = instanceToInstance({
      name,
      email,
      id,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}
