import { Module, Global } from '@nestjs/common';
import { AppConfig, configProvider } from '../app.config.provider';
import mongoose from 'mongoose';
import { MongoRepository } from '../repository/mongoRepository';
import { GetFilmDto, GetFilmSchedulesDto, GetFilmsDto } from '../films/dto';
import { OrderDto } from '../order/dto';

export interface IRepository {
  getAllFilms(): Promise<GetFilmsDto>;
  getFilmById(id: string): Promise<GetFilmDto>;
  getFilmSchedulesById(id: string): Promise<GetFilmSchedulesDto>;
  createOrder(order: Omit<OrderDto, 'id'>): Promise<OrderDto>;
}

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE',
      useFactory: async (config: AppConfig): Promise<IRepository> => {
        switch (config.database.driver) {
          case 'mongodb':
            return new MongoRepository(
              await mongoose.connect(config.database.url),
            );
          case 'postgres':
            break;
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
