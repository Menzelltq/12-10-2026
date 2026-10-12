import { Controller, Get, Post, Body, HttpCode, Query } from '@nestjs/common';
import * as nilaidto from './dto/nilai.dto.js';
import { NilaiService } from './nilai.service.js';

@Controller('nilai')
export class NilaiController {
  constructor(private readonly nilaiService: NilaiService) {}

  @Get('hitung')
  hitungRaporGet(
    @Query('nama') nama: string,
    @Query('tugas') tugas: string | string[],
    @Query('uts') uts: string,
    @Query('uas') uas: string,
  ): nilaidto.HitungNilaiResponseDto {
    const daftarTugas = tugas === undefined
      ? []
      : (Array.isArray(tugas) ? tugas : [tugas])
        .flatMap((nilai) => nilai.split(','))
        .map(Number);

    return this.nilaiService.hitungRapor({
      nama,
      tugas: daftarTugas,
      uts: Number(uts),
      uas: Number(uas),
    });
  }

  @Post('hitung')
  @HttpCode(200)
  hitungRapor(@Body() body: nilaidto.HitungNilaiDto): nilaidto.HitungNilaiResponseDto {
    return this.nilaiService.hitungRapor(body);
  }
}