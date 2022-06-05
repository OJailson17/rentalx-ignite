import { IMailProvider, ISendMailProps } from '../IMailProvider';

export class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];

  async sendMail({ to, subject, variables, path }: ISendMailProps): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}
