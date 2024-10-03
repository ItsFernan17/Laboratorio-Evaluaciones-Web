import { Injectable } from '@nestjs/common';
import { CreateCertificacionDto } from './dto/create-certificacion.dto';
import { UpdateCertificacionDto } from './dto/update-certificacion.dto';

@Injectable()
export class CertificacionService {
  create(createCertificacionDto: CreateCertificacionDto) {
    return 'This action adds a new certificacion';
  }

  findAll() {
    return `This action returns all certificacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} certificacion`;
  }

  update(id: number, updateCertificacionDto: UpdateCertificacionDto) {
    return `This action updates a #${id} certificacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} certificacion`;
  }
}
