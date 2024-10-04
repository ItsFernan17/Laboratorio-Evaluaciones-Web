import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleo } from './model/empleo.entity';  // Asegúrate de que la ruta sea correcta
import { EmpleoController } from './empleo.controller';  // Asegúrate de que la ruta sea correcta
import { EmpleoService } from './empleo.service';  // Asegúrate de que la ruta sea correcta

@Module({
  imports: [TypeOrmModule.forFeature([Empleo])],
  controllers: [EmpleoController],
  providers: [EmpleoService],
})
export class EmpleoModule {}
