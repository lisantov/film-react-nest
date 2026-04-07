import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import {DevLogger, TskvLogger} from "./loggers";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/afisha');
  app.useLogger(new TskvLogger());
  app.enableCors();
  await app.listen(3000);
}
void bootstrap();
