import { SES } from 'aws-sdk';
import handlebars from 'handlebars';
import fs from 'node:fs';
import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import { IMailProvider, ISendMailProps } from '../IMailProvider';

@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail({ to, subject, variables, path }: ISendMailProps): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHtml = templateParse(variables);

    await this.client.sendMail({
      from: 'Rentalx <jaylsono17@gmail.com>',
      to,
      subject,
      html: templateHtml,
    });
  }
}
