import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from './model/pregunta.entity';
import { PreguntaController } from './pregunta.controller';
import { PreguntaService } from './pregunta.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { BancoRespuestasModule } from 'src/banco_respuestas/banco_respuestas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pregunta]), UsuarioModule, BancoRespuestasModule],
  controllers: [PreguntaController],
  providers: [PreguntaService],
  exports: [PreguntaService, TypeOrmModule],
})
export class PreguntaModule {}
