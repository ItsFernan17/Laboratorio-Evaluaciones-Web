import { Module } from '@nestjs/common';
import { ComandoService } from './comando.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comando } from './model/comando.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comando])],
  providers: [ComandoService],
  exports: [TypeOrmModule, ComandoService]
})
export class ComandoModule {}
