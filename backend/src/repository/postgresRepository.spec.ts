import { Test, TestingModule } from '@nestjs/testing';
import { PostgresRepository } from './postgresRepository';

describe('PostgresRepository', () => {
  let provider: PostgresRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresRepository],
    }).compile();

    provider = module.get<PostgresRepository>(PostgresRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
