import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { detalleExamen } from './model/detalle-examen.entity';
import { DetalleExamenController } from './detalle-examen.controller';
import { DetalleExamenService } from './detalle-examen.service';

@Module({
  imports: [TypeOrmModule.forFeature([detalleExamen])],
  controllers: [DetalleExamenController],
  providers: [DetalleExamenService],
})
export class DetalleExamenModule {}
