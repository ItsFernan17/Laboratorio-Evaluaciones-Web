import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Examen } from './model/examen.entity';
import { ExamenController } from './examen.controller';
import { ExamenService } from './examen.service';

@Module({
  imports: [TypeOrmModule.forFeature([Examen])],
  controllers: [ExamenController],
  providers: [ExamenService],
})
export class ExamenModule {}
