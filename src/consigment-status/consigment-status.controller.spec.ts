import { Test, TestingModule } from '@nestjs/testing';
import { ConsigmentStatusController } from './consigment-status.controller';
import { ConsigmentStatusService } from './consigment-status.service';

describe('ConsigmentStatusController', () => {
  let controller: ConsigmentStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsigmentStatusController],
      providers: [ConsigmentStatusService],
    }).compile();

    controller = module.get<ConsigmentStatusController>(ConsigmentStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
