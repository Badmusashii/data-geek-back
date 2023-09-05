import { Test, TestingModule } from '@nestjs/testing';
import { DatageekService } from './datageek.service';

describe('DatageekService', () => {
  let service: DatageekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatageekService],
    }).compile();

    service = module.get<DatageekService>(DatageekService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
