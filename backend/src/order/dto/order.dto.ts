export interface IOrder {
  id: string;
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderDto implements IOrder {
  id: string;
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}
