import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  const PORT = process.env.PORT;
  if (!PORT) {
    throw new Error("Port Variable in not defined in .env")
  }
  await app.listen(PORT);
}
bootstrap();
