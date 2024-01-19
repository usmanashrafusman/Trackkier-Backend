import { Test, TestingModule } from '@nestjs/testing';
import { ConsigmentController } from './consigment.controller';
import { ConsigmentService } from './consigment.service';

describe('ConsigmentController', () => {
  let controller: ConsigmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsigmentController],
      providers: [ConsigmentService],
    }).compile();

    controller = module.get<ConsigmentController>(ConsigmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
