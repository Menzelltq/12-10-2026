import { BadRequestException, Controller, Get, Post, Param, Query, Body, HttpCode } from '@nestjs/common';
import { KasirService } from './kasir.service.js';
import * as nilaidto from './dto/kasir.dto.js';

@Controller('kasir')
export class KasirController {
  constructor(private readonly kasirService: KasirService) {}

  @Get('checkout/:member')
  checkoutGet(
    @Param('member') member: string,
    @Query('metode') metode: string,
    @Query('items') items: string,
  ): nilaidto.CheckoutResponseDto {
    let body: nilaidto.CheckoutDto;
    try {
      body = { items: JSON.parse(items) as nilaidto.ItemDto[] };
    } catch {
      throw new BadRequestException('Query items harus berupa JSON array yang valid');
    }

    return this.kasirService.checkout(member, metode, body);
  }

  @Post('checkout/:member')
  @HttpCode(200)
  checkout(
    @Param('member') member: string,
    @Query('metode') metode: string,
    @Body() body: nilaidto.CheckoutDto,
  ): nilaidto.CheckoutResponseDto {
    return this.kasirService.checkout(member, metode, body);
  }
}