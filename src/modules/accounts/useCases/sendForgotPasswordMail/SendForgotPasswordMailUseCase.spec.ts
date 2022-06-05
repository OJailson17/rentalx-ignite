import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send forgot email', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '64778852',
      email: 'uno@totofnok.kw',
      name: 'Johnny Watts',
      password: '7B0hBr',
    });

    await sendForgotPasswordMailUseCase.execute('uno@totofnok.kw');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send email if user does not exist', async () => {
    await expect(sendForgotPasswordMailUseCase.execute('azdud@kavit.ss')).rejects.toEqual(
      new AppError('User does not exist!'),
    );
  });

  it('should be able to create a new userTokens', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      driver_license: '655534',
      email: 'va@edediha.re',
      name: 'Clarence Higgins',
      password: '7B0hBr',
    });

    await sendForgotPasswordMailUseCase.execute('va@edediha.re');

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
