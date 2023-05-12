import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Mail } from './mail.model';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendMessage(data: Mail) {
    const { name, email, subject, message } = data;
    await this.mailerService.sendMail({
      to: this.configService.get('MAIL_DOMAIN'),
      subject: `[Portfolio] New message from ${data.name}`,
      template: 'main',
      context: {
        name,
        email,
        subject,
        message,
      },
    });

    return {
      sucess: true,
      message: 'Message sent successfully',
    };
  }
}
