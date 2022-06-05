import handlebars from 'handlebars';
import fs from 'node:fs';
import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import { IMailProvider, ISendMailProps } from '../IMailProvider';

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.createClient();
  }

  private async createClient() {
    try {
      const account = await nodemailer.createTestAccount();

      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    } catch (err) {
      console.error(`EtherealMailProvider - Error:\n${err}`);
    }
  }

  async sendMail({ to, subject, variables, path }: ISendMailProps): Promise<void> {
    if (!this.client) {
      await this.createClient();
    }

    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHtml = templateParse(variables);

    const message = await this.client.sendMail({
      from: 'Rentalx <noreply@rentalx.com.br>',
      to,
      subject,
      html: templateHtml,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
