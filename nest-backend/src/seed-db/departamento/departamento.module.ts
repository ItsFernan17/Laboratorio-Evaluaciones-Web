import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from './model/departamento.entity';
import { DepartamentoService } from './departamento.service';

@Module({
  imports: [TypeOrmModule.forFeature([Departamento])],
  providers: [DepartamentoService],
  exports: [TypeOrmModule, DepartamentoService]
})
export class DepartamentoModule {}