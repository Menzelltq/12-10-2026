import { BadRequestException, Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Latihan4Service } from './latihan4.service.js';
import { CreateLatihan4Dto } from './dto/create-latihan4.dto.js';
import { UpdateLatihan4Dto } from './dto/update-latihan4.dto.js';


@Controller('latihan4')
export class Latihan4Controller {
  constructor(private readonly latihan4Service: Latihan4Service) {}

  @Get('bilangan/:bilangan')
  ganjilataugenapGet(@Param('bilangan') bilangan: string) {
    const nilai = Number(bilangan);
    if (Number.isNaN(nilai) || nilai < 1 || nilai > 100) {
      throw new BadRequestException('Bilangan harus berupa angka antara 1 sampai 100');
    }
    return this.latihan4Service.ganjilataugenap(nilai);
  }

  @Post('bilangan')
  ganjilataugenapPost(@Body() createLatihan4Dto: CreateLatihan4Dto) {
    return this.latihan4Service.ganjilataugenap(createLatihan4Dto.bilangan);
  }
}
