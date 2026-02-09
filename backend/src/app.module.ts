import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {ConfigModule} from "@nestjs/config";
import * as path from "node:path";

import {configProvider} from "./app.config.provider";
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { Films } from './films/films';
import { Order } from './order/order';
import { FilmsRepository } from './films.repository/films.repository';

@Module({
  imports: [
	ConfigModule.forRoot({
          isGlobal: true,
          cache: true
      }),
      // @todo: Добавьте раздачу статических файлов из public
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, Films, Order, FilmsRepository],
})
export class AppModule {}
