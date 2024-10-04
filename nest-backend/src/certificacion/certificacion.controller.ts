import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificacionService } from './certificacion.service';
import { CreateCertificacionDto } from './dto/create-certificacion.dto';

@Controller('certificacion')
export class CertificacionController {
  constructor(private readonly certificacionService: CertificacionService) {}

}
