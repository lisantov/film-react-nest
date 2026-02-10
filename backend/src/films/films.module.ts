import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { AppConfig, configProvider } from '../app.config.provider';
import mongoose from 'mongoose';
import { MongoRepository } from '../repository/mongoRepository';

const databaseProvider = {
  provide: 'DATABASE',
  useFactory: (config: AppConfig) => {
    switch (config.database.driver) {
      case 'mongodb':
        return mongoose.connect(config.database.url);
    }
  },
  inject: ['CONFIG'],
};

@Module({
  controllers: [FilmsController],
  providers: [FilmsService, databaseProvider, MongoRepository, configProvider],
})
export class FilmsModule {}
