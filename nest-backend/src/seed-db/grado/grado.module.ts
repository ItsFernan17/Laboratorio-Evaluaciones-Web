import { Module } from '@nestjs/common';
import { GradoController } from './grado.controller';

@Module({
  controllers: [GradoController]
})
export class GradoModule {}
