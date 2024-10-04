import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BancoRespuestas } from './model/banco_respuestas.entity';
import { BancoRespuestasController } from './banco_respuestas.controller';
import { BancoRespuestasService } from './banco_respuestas.service';

@Module({
  imports: [TypeOrmModule.forFeature([BancoRespuestas])],
  controllers: [BancoRespuestasController],
  providers: [BancoRespuestasService],
})
export class BancoRespuestasModule {}
