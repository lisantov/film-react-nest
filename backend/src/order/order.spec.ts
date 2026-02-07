import { Test, TestingModule } from '@nestjs/testing';
import { Order } from './order';

describe('Order', () => {
  let provider: Order;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Order],
    }).compile();

    provider = module.get<Order>(Order);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
