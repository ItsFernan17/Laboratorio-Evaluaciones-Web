import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from './model/departamento.entity';
import { Repository } from 'typeorm';
import { CreateDepartamentoDto } from './dto';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async findAll() {
    return this.departamentoRepository.find();
  }

  async createDepartamento(createDepartamentoDto: CreateDepartamentoDto) {
    try {
      const departamento = this.departamentoRepository.create(
        createDepartamentoDto,
      );
      await this.departamentoRepository.save(departamento);
      return { ...departamento };
    } catch (error) {
      console.error('Error al insertar departamento:', error);
      throw new BadRequestException(
        'No se pudo insertar el departamento: ' + error.message,
      );
    }
  }

  async deleteAllDepartamentos() {
    const query =
      this.departamentoRepository.createQueryBuilder('departamento');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }
}
