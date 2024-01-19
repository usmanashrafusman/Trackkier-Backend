import { Test, TestingModule } from '@nestjs/testing';
import { ConsigmentService } from './consigment.service';

describe('ConsigmentService', () => {
  let service: ConsigmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsigmentService],
    }).compile();

    service = module.get<ConsigmentService>(ConsigmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
