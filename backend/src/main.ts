import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useStaticAssets(path.join(__dirname, 'public'));
  await app.listen(3000);
}
bootstrap();
