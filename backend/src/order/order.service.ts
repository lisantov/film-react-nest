import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDtoResponse, CreateOrderDtoBody } from './dto';
import { IRepository } from '../database/database.module';

@Injectable()
export class OrderService {
  constructor(
    @Inject('DATABASE') private readonly filmsRepository: IRepository,
  ) {}

  async createOrder(
    order: CreateOrderDtoBody,
  ): Promise<CreateOrderDtoResponse> {
    const itemsPromise = order.tickets.map((order) =>
      this.filmsRepository.createOrder(order),
    );

    const items = await Promise.all(itemsPromise);

    return {
      total: items.length,
      items,
    };
  }
}
