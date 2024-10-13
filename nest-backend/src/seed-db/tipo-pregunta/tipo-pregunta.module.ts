import { Module } from '@nestjs/common';
import { TipoPreguntaService } from './tipo-pregunta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoPregunta } from './model/tipo-pregunta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoPregunta])],
  providers: [TipoPreguntaService],
  controllers: [],
  exports: [TipoPreguntaService, TypeOrmModule],
})
export class TipoPreguntaModule {}
