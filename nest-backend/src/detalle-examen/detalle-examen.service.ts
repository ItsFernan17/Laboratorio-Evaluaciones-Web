import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { detalleExamen } from './model/detalle-examen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetalleDto, UpdateDetalleDto } from './dto';

@Injectable()
export class DetalleExamenService {
  constructor(
    @InjectRepository(detalleExamen)
    private detalleRepository: Repository<detalleExamen>,
  ) {}

  async findAll() {
    return this.detalleRepository.find(
     { where: { estado: true }},
    );
  }

  async findById(codigo_detalle: number) {
    const detalleExistente = await this.detalleRepository.findOne({
      where: { codigo_detalle, estado: true },
    });

    if (!detalleExistente) {
      return new HttpException(
        'El Detalle del Examen con el Código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    return detalleExistente;
  }

  async createDetalle(createDetalleDto: CreateDetalleDto) {
    //Esto hacerlo cuando ya esten todas las tablas
    //const examenExistente = await this.examenRepository.findOne({
    //where: {
    // empleo:
    // usuario:

    // }
    //  })
    //if(examenExistente){
    //return new HttpException('El examen ya existe en la base de datos.', 409)
    //}

    const newDetalle = this.detalleRepository.create({
      estado: true,
      ...createDetalleDto,
    });
    return this.detalleRepository.save(newDetalle);
  }

  async updateDetalle(
    codigo_detalle: number,
    updateDetalleDto: UpdateDetalleDto,
  ) {
    const detalleExistente = await this.detalleRepository.findOne({
      where: { codigo_detalle },
    });

    if (!detalleExistente) {
      return new HttpException(
        'El Examen con el Código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    const updateExamen = Object.assign(detalleExistente, updateDetalleDto);
    return this.detalleRepository.save(updateExamen);
  }

  async desactiveDetalle(codigo_detalle: number) {
    const detalleExistente = await this.detalleRepository.findOne({
      where: { codigo_detalle },
    });

    if (!detalleExistente) {
      return new HttpException(
        'El Examen con el Código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }
    detalleExistente.estado = false;

    const resultado = await this.detalleRepository.save(detalleExistente);
    return resultado;
  }
}
