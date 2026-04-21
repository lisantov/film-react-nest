import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DevLogger, TskvLogger, JsonLogger } from './loggers';

const getLoggerFromEnvironment = () => {
  switch (process.env.LOGGER_TYPE) {
    case 'dev':
      return new DevLogger('LOGGER_INFO');
    case 'json':
      return new JsonLogger();
    case 'tskv':
      return new TskvLogger();
    default:
      throw new Error('Unsupported logger type');
  }
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/afisha');
  app.useLogger(getLoggerFromEnvironment());
  app.enableCors();
  await app.listen(process.env.APP_PORT ?? 3000);
}
void bootstrap();
