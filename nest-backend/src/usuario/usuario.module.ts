import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './model/usuario.entity';
import { Departamento } from 'src/seed-db/departamento/model/departamento.entity';
import { Poblacion } from 'src/seed-db/poblacion/model/poblacion.entity';
import { Grado } from 'src/seed-db/grado/model/grado.entity';
import { DepartamentoModule } from 'src/seed-db/departamento/departamento.module';
import { SeedDbModule } from 'src/seed-db/seed-db.module';

@Module({
    imports: [
    TypeOrmModule.forFeature([Usuario, Departamento, Poblacion, Grado]),
    SeedDbModule,
    DepartamentoModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService, TypeOrmModule],
})
export class UsuarioModule {}
