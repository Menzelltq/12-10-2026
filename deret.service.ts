import {Injectable, BadRequestException} from '@nestjs/common';
import { DeretResponseDto } from './dto/deret.dto.js';

@Injectable()
export class DeretService {
    generateDeret(jenisParam: string, jumlahParam?: string, urutanParam: string = 'asc'): DeretResponseDto {
    const jenis = jenisParam.toLowerCase();
    const allowedJenis = ['ganjil', 'genap', 'kuadrat'];
    if (!allowedJenis.includes(jenis)) {
      throw new BadRequestException('Jenis deret hanya boleh ganjil, genap, atau kuadrat');
    }

    if (!jumlahParam || jumlahParam.trim() === '') {
      throw new BadRequestException('Query jumlah wajib diisi');
    }

    const jumlah = Number(jumlahParam);
    if (Number.isNaN(jumlah) || !Number.isInteger(jumlah) || jumlah < 1 || jumlah > 20) {
      throw new BadRequestException('Jumlah harus berupa bilangan bulat antara 1 sampai 20');
    }

    const urutan = urutanParam.toLowerCase();
    if (urutan !== 'asc' && urutan !== 'desc') {
      throw new BadRequestException('Urutan hanya boleh asc atau desc');
    }

    const data: number[] = [];
    let total = 0;

    for (let i = 1; i <= jumlah; i++) {
      let val = 0;
      if (jenis === 'ganjil') {
        val = 2 * i - 1;
      } else if (jenis === 'genap') {
        val = 2 * i;
      } else if (jenis === 'kuadrat') {
        val = i * i;
      }
      data.push(val);
      total += val;
    }

    if (urutan === 'desc') {
      data.reverse();
    }

    return {
      jenis,
      jumlah,
      data,
      total,
    };
  }
}