import { Injectable } from '@nestjs/common';
import { CreateCertificacionDto } from './dto/create-certificacion.dto';

@Injectable()
export class CertificacionService {
  create(createCertificacionDto: CreateCertificacionDto) {
    return 'This action adds a new certificacion';
  }

}
