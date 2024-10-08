import { Module } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { DepartamentoController } from './departamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from './model/departamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Departamento])],
  controllers: [DepartamentoController],
  providers: [DepartamentoService],
  exports: [DepartamentoService, TypeOrmModule],
})
export class DepartamentoModule {}
