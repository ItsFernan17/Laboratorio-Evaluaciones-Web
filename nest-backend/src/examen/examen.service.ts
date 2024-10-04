import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Examen } from './model/examen.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExamenDto, UpdateExamenDto } from './dto';

@Injectable()
export class ExamenService {
  constructor( @InjectRepository(Examen)
    private examenRepository: Repository<Examen>
  ) {}

  async findAll() {
    return this.examenRepository.find({
      where: { estado: true },
    });

  }

  async findById(codigo_examen: number) {
    const examenExistente = await this.examenRepository.findOne({
      where: { codigo_examen, estado: true },
    });

    if (!examenExistente) {
      return new HttpException(
        'El Examen con el Código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    return examenExistente;
  }

  async createExamen(createExamenDto: CreateExamenDto) {
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

    const newExamen = this.examenRepository.create({
      estado: true,
      ...createExamenDto,
    });
    return this.examenRepository.save(newExamen);
  }

  async updateExamen(codigo_examen: number, updateExamenDto: UpdateExamenDto) {
    const examenExistente = await this.examenRepository.findOne({
      where: { codigo_examen },
    });

    if (!examenExistente) {
      return new HttpException(
        'El Examen con el código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    const updateExamen = Object.assign(examenExistente, updateExamenDto);
    return this.examenRepository.save(updateExamen);
  }

  async desactiveExamen(codigo_examen: number) {
    const examenExistente = await this.examenRepository.findOne({
      where: { codigo_examen },
    });

    if (!examenExistente) {
      return new HttpException(
        'El Examen con el código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }
    examenExistente.estado = false;

    const resultado = await this.examenRepository.save(examenExistente);
    return resultado;
  }

}
