import { Test, TestingModule } from '@nestjs/testing';
import { ConsigmentStatusService } from './consigment-status.service';

describe('ConsigmentStatusService', () => {
  let service: ConsigmentStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsigmentStatusService],
    }).compile();

    service = module.get<ConsigmentStatusService>(ConsigmentStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
