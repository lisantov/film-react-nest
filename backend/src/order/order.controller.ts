import { Body, Controller, Post } from '@nestjs/common';
import { OrderDto } from './dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() orderDto: OrderDto[]) {
    return this.orderService.createOrder(orderDto);
  }
}
