import { Controller, Get, Post, Body, Param, Query, HttpCode } from '@nestjs/common';
import { DeretService } from './deret.service.js';
import * as deretdto from './dto/deret.dto.js';

@Controller('deret')
export class DeretController {
  constructor(private readonly deretService: DeretService) {}

  @Get(':jenis')
  getDeret(
    @Param('jenis') jenis: string,
    @Query('jumlah') jumlah: string,
    @Query('urutan') urutan?: string,
  ): deretdto.DeretResponseDto {
    return this.deretService.generateDeret(jenis, jumlah, urutan);
  }

  @Post(':jenis')
  @HttpCode(200)
  postDeret(
    @Param('jenis') jenis: string,
    @Body() body: { jumlah: number; urutan?: string },
  ): deretdto.DeretResponseDto {
    return this.deretService.generateDeret(jenis, String(body?.jumlah), body?.urutan);
  }
}