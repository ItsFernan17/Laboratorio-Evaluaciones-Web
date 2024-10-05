import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BancoRespuestas } from './model/banco_respuestas.entity';
import { BancoRespuestasController } from './banco_respuestas.controller';
import { BancoRespuestasService } from './banco_respuestas.service';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([BancoRespuestas]),  UsuarioModule],
  controllers: [BancoRespuestasController],
  providers: [BancoRespuestasService],
  exports: [TypeOrmModule],
})
export class BancoRespuestasModule {}
