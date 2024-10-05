import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleExamen } from './model/detalle-examen.entity';
import { DetalleExamenController } from './detalle-examen.controller';
import { DetalleExamenService } from './detalle-examen.service';
import { ExamenModule } from 'src/examen/examen.module';
import { PreguntaModule } from 'src/pregunta/pregunta.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleExamen]),UsuarioModule, ExamenModule, PreguntaModule],
  controllers: [DetalleExamenController],
  providers: [DetalleExamenService],
})
export class DetalleExamenModule {}
