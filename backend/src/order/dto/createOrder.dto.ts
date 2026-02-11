import { OrderDto } from './order.dto';

export class CreateOrderDtoBody {
  email: string;
  phone: string;
  tickets: OrderDto[];
}

export class CreateOrderDtoResponse {
  total: number;
  items: OrderDto[];
}
