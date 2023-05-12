import {
  Controller,
  Get,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail/mail.service';
import { Mail } from './mail/mail.model';

@Controller()
export class AppController {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHealthStatus() {
    return {
      status: 'ok',
    };
  }

  @Post('mail')
  async sendMessage(@Body() data: Mail) {
    // check if security key is correct
    if (data.securityCode !== this.configService.get('SECURITY_CODE')) {
      console.log(data.securityCode, this.configService.get('SECURITY_CODE'));
      throw new UnauthorizedException('Invalid security code');
    }
    // send message
    return await this.mailService.sendMessage(data);
  }
}
