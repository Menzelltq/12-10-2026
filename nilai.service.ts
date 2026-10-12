import { Injectable, BadRequestException } from '@nestjs/common';
import { HitungNilaiDto, HitungNilaiResponseDto } from './dto/nilai.dto.js';

@Injectable()
export class NilaiService {
  hitungRapor(body: HitungNilaiDto): HitungNilaiResponseDto {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Body request tidak valid');
    }

    const { nama, tugas, uts, uas } = body;

    if (typeof nama !== 'string' || nama.trim() === '') {
      throw new BadRequestException('Nama harus berupa string dan tidak boleh kosong');
    }

    if (!Array.isArray(tugas) || tugas.length === 0) {
      throw new BadRequestException('Tugas harus berupa array berisi minimal 1 angka');
    }

    for (let i = 0; i < tugas.length; i++) {
      const val = tugas[i];
      if (typeof val !== 'number' || Number.isNaN(val) || val < 0 || val > 100) {
        throw new BadRequestException(`Nilai tugas pada indeks ke-${i} harus berupa angka 0 - 100`);
      }
    }

    if (typeof uts !== 'number' || Number.isNaN(uts) || uts < 0 || uts > 100) {
      throw new BadRequestException('UTS harus berupa angka antara 0 sampai 100');
    }

    if (typeof uas !== 'number' || Number.isNaN(uas) || uas < 0 || uas > 100) {
      throw new BadRequestException('UAS harus berupa angka antara 0 sampai 100');
    }

    const totalTugas = tugas.reduce((acc, curr) => acc + curr, 0);
    const rataTugas = totalTugas / tugas.length;

    const rawNilaiAkhir = 0.3 * rataTugas + 0.3 * uts + 0.4 * uas;
    const nilaiAkhir = Math.round(rawNilaiAkhir * 100) / 100;

    let predikat = 'D';
    if (nilaiAkhir >= 90) predikat = 'A';
    else if (nilaiAkhir >= 80) predikat = 'B';
    else if (nilaiAkhir >= 70) predikat = 'C';

    const status = nilaiAkhir >= 75 ? 'Lulus' : 'Remedial';

    return {
      nama: nama.trim(),
      rataTugas: Math.round(rataTugas * 100) / 100,
      nilaiAkhir,
      predikat,
      status,
    };
  }
}