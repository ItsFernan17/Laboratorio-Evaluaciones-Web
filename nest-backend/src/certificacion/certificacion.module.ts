import { Module } from '@nestjs/common';
import { CertificacionService } from './certificacion.service';
import { CertificacionController } from './certificacion.controller';

@Module({
  controllers: [CertificacionController],
  providers: [CertificacionService],
})
export class CertificacionModule {}
