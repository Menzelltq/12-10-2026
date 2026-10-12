import { Test, TestingModule } from '@nestjs/testing';
import { Latihan4Controller } from './latihan4.controller.js';
import { Latihan4Service } from './latihan4.service.js';

describe('Latihan4Controller', () => {
  let controller: Latihan4Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Latihan4Controller],
      providers: [Latihan4Service],
    }).compile();

    controller = module.get<Latihan4Controller>(Latihan4Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
