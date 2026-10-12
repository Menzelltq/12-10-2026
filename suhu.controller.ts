import { Controller, Get, Post, Body, Query, HttpCode } from '@nestjs/common';
import { SuhuService } from './suhu.service.js';
import * as suhuDto from './dto/suhu.dto.js';

@Controller('latihan4/suhu')
export class SuhuController {
  constructor(private readonly suhuService: SuhuService) {}

  @Get('konversi')
  konversi(
    @Query('nilai') nilai: string,
    @Query('dari') dari: string,
    @Query('ke') ke: string,
  ): suhuDto.KonversiSuhuResponseDto {
    return this.suhuService.konversiSuhu(nilai, dari, ke);
  }

  @Post('konversi')
  @HttpCode(200)
  konversiPost(
    @Body() body: { nilai: number; dari: string; ke: string },
  ): suhuDto.KonversiSuhuResponseDto {
    return this.suhuService.konversiSuhu(String(body?.nilai), body?.dari, body?.ke);
  }
}