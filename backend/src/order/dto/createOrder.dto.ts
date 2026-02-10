import { OrderDto } from './order.dto';

export class CreateOrderDtoResponse {
  total: number;
  items: OrderDto[];
}
