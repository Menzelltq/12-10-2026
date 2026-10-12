import { Injectable, BadRequestException } from '@nestjs/common';
import { KonversiSuhuResponseDto } from './dto/suhu.dto.js';

@Injectable()
export class SuhuService {
  konversiSuhu(nilaiParam?: string, dariParam?: string, keParam?: string): KonversiSuhuResponseDto {
    if (!nilaiParam || !dariParam || !keParam) {
      throw new BadRequestException('Query nilai, dari, dan ke wajib diisi');
    }

    const nilai = Number(nilaiParam);
    if (Number.isNaN(nilai)) {
      throw new BadRequestException('Nilai harus berupa angka');
    }

    const dari = dariParam.toLowerCase();
    const ke = keParam.toLowerCase();
    const allowedUnits = ['celsius', 'fahrenheit', 'kelvin'];

    if (!allowedUnits.includes(dari) || !allowedUnits.includes(ke)) {
      throw new BadRequestException('Satuan dari dan ke hanya boleh celsius, fahrenheit, atau kelvin');
    }

    if (dari === ke) {
      throw new BadRequestException('Satuan dari dan ke tidak boleh sama');
    }

    if (dari === 'kelvin' && nilai < 0) {
      throw new BadRequestException('Nilai kelvin tidak boleh kurang dari 0');
    }

    let celsius: number;
    if (dari === 'celsius') {
      celsius = nilai;
    } else if (dari === 'fahrenheit') {
      celsius = ((nilai - 32) * 5) / 9;
    } else {
      celsius = nilai - 273.15;
    }

    let hasilHitung: number;
    if (ke === 'celsius') {
      hasilHitung = celsius;
    } else if (ke === 'fahrenheit') {
      hasilHitung = (celsius * 9) / 5 + 32;
    } else {
      hasilHitung = celsius + 273.15;
    }

    const hasil = Math.round(hasilHitung * 100) / 100;

    return {
      nilaiAsal: nilai,
      satuanAsal: dari,
      hasil,
      satuanHasil: ke,
    };
  }
}