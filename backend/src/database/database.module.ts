import { Module, Global } from '@nestjs/common';
import { AppConfig, configProvider } from '../app.config.provider';
import mongoose from 'mongoose';
import { MongoRepository } from '../repository/mongoRepository';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE',
      useFactory: async (config: AppConfig) => {
        switch (config.database.driver) {
          case 'mongodb':
            return new MongoRepository(
              await mongoose.connect(config.database.url),
            );
          default:
            throw new Error(
              `Неподдерживаемая База данных: ${config.database.driver}`,
            );
        }
      },
      inject: ['CONFIG'],
    },
    configProvider,
  ],
  exports: ['DATABASE'],
})
export class DatabaseModule {}
