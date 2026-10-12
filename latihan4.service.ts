import { Injectable } from '@nestjs/common';
import { CreateLatihan4Dto } from './dto/create-latihan4.dto.js';
import { UpdateLatihan4Dto } from './dto/update-latihan4.dto.js';

@Injectable()
export class Latihan4Service {
  create(createLatihan4Dto: CreateLatihan4Dto) {
    return 'This action adds a new latihan4';
  }

  ganjilataugenap(bilangan: number){
    if(bilangan % 2 === 0){
      return 'Bilangan Genap';
    }
    return 'Bilangan Ganjil';
    
  }
}
