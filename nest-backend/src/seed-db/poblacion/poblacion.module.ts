import { Module } from '@nestjs/common';
import { PoblacionService } from './poblacion.service';

@Module({
  providers: [PoblacionService]
})
export class PoblacionModule {}
