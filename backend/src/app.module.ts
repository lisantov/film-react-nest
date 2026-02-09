import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { OrderController } from './order/order.controller';
import { Order } from './order/order';
import { FilmsModule } from './films/films.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'public'),
    }),
    FilmsModule,
  ],
  controllers: [OrderController],
  providers: [configProvider, Order],
})
export class AppModule {}
