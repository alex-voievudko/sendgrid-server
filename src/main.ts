import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: [
      'http://localhost:8000',
      'http://localhost:9000',
      'http://localhost:3000',
      'https://alexvoievudko.com',
    ],
    methods: 'GET,POST',
  });
  await app.listen(3000);
}
bootstrap();
