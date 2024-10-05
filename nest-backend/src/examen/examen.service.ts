import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Examen } from './model/examen.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExamenDto, UpdateExamenDto } from './dto';
import { Usuario } from 'src/usuario/model/usuario.entity';
import { Empleo } from 'src/empleo/model/empleo.entity';

@Injectable()
export class ExamenService {
  constructor( @InjectRepository(Examen)
    private examenRepository: Repository<Examen>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Empleo)
    private readonly empleoRepository: Repository<Empleo>,
  ) {}

  async findAll() {
    this.examenRepository.find();
  }

  async findById(codigo_examen: number) {
    const examenExistente = await this.examenRepository.findOne({
      where: { codigo_examen },
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
    const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: createExamenDto.usuario_ingreso } });
  
    if (!usuario) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
  
    const empleo = await this.empleoRepository.findOne({ where: { ceom: createExamenDto.empleo } });
  
    if (!empleo) {
      throw new HttpException('Empleo no encontrado.', HttpStatus.NOT_FOUND);
    }
  
    const newExamen = this.examenRepository.create({
      ...createExamenDto,
      estado: true,
      usuario: usuario,
      empleo: empleo,
      usuario_ingreso: usuario,
      fecha_modifica: null,
    });
  
    return this.examenRepository.save(newExamen);
  }


  async updateExamen(codigo_examen: number, updateExamenDto: UpdateExamenDto) {
    const examenExistente = await this.examenRepository.findOne({
      where: { codigo_examen },
    });

    if (!examenExistente) {
      throw new HttpException(
        'La respuesta con el código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: updateExamenDto.usuario_modifica } });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    const empleo = await this.empleoRepository.findOne({ where: { ceom: updateExamenDto.empleo } });

    if (!empleo) {
      throw new HttpException('Empleo no encontrado.', HttpStatus.NOT_FOUND);
    }

    const fechaEvaluacionDate = new Date(updateExamenDto.fecha_evaluacion);

    examenExistente.fecha_evaluacion = fechaEvaluacionDate;
    examenExistente.usuario = usuario;
    examenExistente.punteo_total = updateExamenDto.punteo_total;
    examenExistente.usuario_modifica = usuario;
    examenExistente.empleo = empleo;
    examenExistente.fecha_modifica = new Date();

    return this.examenRepository.save(examenExistente);
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
