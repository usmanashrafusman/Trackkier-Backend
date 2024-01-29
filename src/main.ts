import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from 'src/app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.getOrThrow('PORT');

  app.use(helmet());
  app.use(cookieParser());

  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(PORT);
})();
