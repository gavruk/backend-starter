import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type', 'Authorization'],
    origin: config().appUrl,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config().port);
}
bootstrap();
