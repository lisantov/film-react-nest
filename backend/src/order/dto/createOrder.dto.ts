import { OrderDto } from './order.dto';

export class CreateOrderDtoBody {
  email: string;
  phone: string;
  tickets: Omit<OrderDto, 'id'>[];
}

export class CreateOrderDtoResponse {
  total: number;
  items: OrderDto[];
}
