import { Test, TestingModule } from '@nestjs/testing';
import { Latihan4Service } from './latihan4.service.js';

describe('Latihan4Service', () => {
  let service: Latihan4Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Latihan4Service],
    }).compile();

    service = module.get<Latihan4Service>(Latihan4Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
