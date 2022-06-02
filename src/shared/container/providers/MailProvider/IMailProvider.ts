export interface ISendMailProps {
  to: string;
  subject: string;
  body: string;
}

export interface IMailProvider {
  sendMail({ to, subject, body }: ISendMailProps): Promise<void>;
}
