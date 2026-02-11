import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let provider: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService],
    }).compile();

    provider = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
