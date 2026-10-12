import { Injectable, BadRequestException } from '@nestjs/common';
import { CheckoutDto, CheckoutResponseDto, ItemRincianResponseDto } from './dto/kasir.dto.js';

@Injectable()
export class KasirService {
  checkout(memberParam: string, metodeParam: string, body: CheckoutDto): CheckoutResponseDto {
    if (!memberParam) {
      throw new BadRequestException('Parameter member wajib diisi');
    }

    const member = memberParam.toLowerCase();
    const diskonMemberMap: Record<string, number> = {
      reguler: 0,
      silver: 5,
      gold: 10,
    };

    if (!(member in diskonMemberMap)) {
      throw new BadRequestException('Member hanya boleh reguler, silver, atau gold');
    }

    if (!metodeParam) {
      throw new BadRequestException('Query metode wajib diisi');
    }

    const metode = metodeParam.toLowerCase();
    if (metode !== 'tunai' && metode !== 'qris') {
      throw new BadRequestException('Metode pembayaran hanya boleh tunai atau qris');
    }

    if (!body || !Array.isArray(body.items) || body.items.length === 0 || body.items.length > 10) {
      throw new BadRequestException('Items harus berupa array, tidak boleh kosong, dan maksimal 10 item');
    }

    const rincian: ItemRincianResponseDto[] = [];
    let subtotalKeseluruhan = 0;
    let totalItem = 0;

    for (let i = 0; i < body.items.length; i++) {
      const item = body.items[i];
      const itemNo = i + 1;

      if (!item || typeof item !== 'object') {
        throw new BadRequestException(`Item ke-${itemNo}: data item tidak valid`);
      }

      if (typeof item.nama !== 'string' || item.nama.trim() === '') {
        throw new BadRequestException(`Item ke-${itemNo}: nama harus berupa string dan tidak boleh kosong`);
      }

      if (typeof item.harga !== 'number' || Number.isNaN(item.harga) || item.harga <= 0) {
        throw new BadRequestException(`Item ke-${itemNo}: harga harus angka lebih dari 0`);
      }

      if (typeof item.qty !== 'number' || Number.isNaN(item.qty) || !Number.isInteger(item.qty) || item.qty <= 0) {
        throw new BadRequestException(`Item ke-${itemNo}: qty harus bilangan bulat lebih dari 0`);
      }

      const itemSubtotal = item.harga * item.qty;
      subtotalKeseluruhan += itemSubtotal;
      totalItem += item.qty;

      rincian.push({
        nama: item.nama.trim(),
        harga: item.harga,
        qty: item.qty,
        subtotal: itemSubtotal,
      });
    }

    const persenDiskon = diskonMemberMap[member];
    const diskon = (subtotalKeseluruhan * persenDiskon) / 100;
    const subtotalSetelahDiskon = subtotalKeseluruhan - diskon;

    const biayaAdmin = metode === 'qris' ? (subtotalSetelahDiskon * 1) / 100 : 0;
    const total = subtotalSetelahDiskon + biayaAdmin;

    return {
      member,
      metode,
      rincian,
      totalItem,
      subtotal: subtotalKeseluruhan,
      diskon,
      biayaAdmin,
      total,
    };
  }
}