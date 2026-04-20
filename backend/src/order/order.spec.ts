import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from "./order.service";
import { IRepository } from "../database/database.module";
import { OrderDto } from "./dto";

const order = {
    email: 'test@test.ru',
    phone: '+79999999999',
    tickets: [{
        film: '1',
        session: '11',
        daytime: 'test',
        row: 1,
        seat: 1,
        price: 1,
    }],
}
const response = {
    total: 1,
    items: [{
        id: '1',
        film: '1',
        session: '11',
        daytime: 'test',
        row: 1,
        seat: 1,
        price: 1,
    }],
}
const createOrder = (order: Omit<OrderDto, 'id'>) =>
    new Promise(resolve => resolve(Object.assign({ id: '1' }, order)))

describe('Films', () => {
  let service: OrderService
  let database: IRepository

  beforeEach(async () => {
    const module: TestingModule = await Test
        .createTestingModule({
          providers: [
            OrderService,
            {
              provide: 'DATABASE',
              useValue: {
                createOrder: jest.fn().mockImplementation(createOrder),
              }
            }
          ],
        })
        .compile();

    service = module.get<OrderService>(OrderService)
    database = module.get<IRepository>('DATABASE')
  });

  it('.createOrder() should call repository method', () => {
    service.createOrder(order)

    expect(database.createOrder).toHaveBeenCalled();
  });

  it('.createOrder() should return correct response', async () => {
    const data = await service.createOrder(order)

    expect(data).toEqual(response);
  });
});
