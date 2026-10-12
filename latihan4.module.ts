import { Module } from '@nestjs/common';
import { Latihan4Service } from './latihan4.service.js';
import { Latihan4Controller } from './latihan4.controller.js';
import { SuhuController } from './suhu.controller.js';
import { SuhuService } from './suhu.service.js';
import { NilaiController } from './nilai.controller.js';
import { NilaiService } from './nilai.service.js';
import { DeretController } from './deret.controller.js';
import { DeretService } from './deret.service.js';
import { KasirController } from './kasir.controller.js';
import { KasirService } from './kasir.service.js';

@Module({
  controllers: [
    Latihan4Controller,
    SuhuController,
    NilaiController,
    DeretController,
    KasirController,
  ],
  providers: [
    Latihan4Service,
    SuhuService,
    NilaiService,
    DeretService,
    KasirService,
  ],
})
export class Latihan4Module {}
