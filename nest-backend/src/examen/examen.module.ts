import { Module } from '@nestjs/common';
import { ExamenService } from './examen.service';
import { ExamenController } from './examen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/model/usuario.entity';
import { TipoExamen } from 'src/tipo-examen/model/tipo-examen.entity';
import { Examen } from './model/examen.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { TipoExamenModule } from 'src/tipo-examen/tipo-examen.module';



@Module({
  imports: [TypeOrmModule.forFeature([Examen, Usuario, TipoExamen]), UsuarioModule, TipoExamenModule],
  controllers: [ExamenController],
  providers: [ExamenService],
  exports: [ExamenService, TypeOrmModule],
})
export class ExamenModule {}
