import { Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from '../repository/mongoRepository';
import { CreateOrderDtoResponse, OrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('DATABASE') private readonly filmsRepository: MongoRepository,
  ) {}

  async createOrder(orders: OrderDto[]): Promise<CreateOrderDtoResponse> {
    const itemsPromise = orders.map((order) =>
      this.filmsRepository.createOrder(order),
    );

    const items = await Promise.all(itemsPromise);

    return {
      total: items.length,
      items,
    };
  }
}
