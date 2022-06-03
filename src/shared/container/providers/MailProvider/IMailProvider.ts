export interface ISendMailProps {
  to: string;
  subject: string;
  variables: any;
  path: string;
}

export interface IMailProvider {
  sendMail({ to, subject, variables, path }: ISendMailProps): Promise<void>;
}
