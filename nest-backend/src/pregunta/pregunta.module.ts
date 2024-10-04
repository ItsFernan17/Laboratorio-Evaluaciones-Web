import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from './model/pregunta.entity';
import { PreguntaController } from './pregunta.controller';
import { PreguntaService } from './pregunta.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pregunta])],
  controllers: [PreguntaController],
  providers: [PreguntaService],
})
export class PreguntaModule {}
