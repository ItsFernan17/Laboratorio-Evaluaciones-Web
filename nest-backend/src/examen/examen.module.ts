import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Examen } from './model/examen.entity';
import { ExamenController } from './examen.controller';
import { ExamenService } from './examen.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { EmpleoModule } from 'src/empleo/empleo.module';


@Module({
  imports: [TypeOrmModule.forFeature([Examen]), UsuarioModule, EmpleoModule],
  controllers: [ExamenController],
  providers: [ExamenService],
  exports: [ExamenService, TypeOrmModule],
})
export class ExamenModule {}
