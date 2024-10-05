import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DetalleExamen } from './model/detalle-examen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetalleDto, UpdateDetalleDto } from './dto';
import { Usuario } from 'src/usuario/model/usuario.entity';
import { Examen } from 'src/examen/model/examen.entity';
import { Pregunta } from 'src/pregunta/model/pregunta.entity';

@Injectable()
export class DetalleExamenService {
  constructor(
    @InjectRepository(DetalleExamen)
    private detalleRepository: Repository<DetalleExamen>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Examen)
    private readonly examenRepository: Repository<Examen>,
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,    
  ) {}

  async findAll() {
    return this.detalleRepository.find({
      where: { estado: true },
    });
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
    const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: createDetalleDto.usuario_ingreso } });
  
    if (!usuario) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
  
    const examen = await this.examenRepository.findOne({ where: { codigo_examen: createDetalleDto.examen } });

    const pregunta = await this.preguntaRepository.findOne({ where: { codigo_pregunta: createDetalleDto.pregunta } });

  
    if (!examen) {
      throw new HttpException('Examen no encontrado.', 404);
    }

    if (!pregunta) {
      throw new HttpException('Pregunta no encontrada.', HttpStatus.NOT_FOUND);
    }
  
    const newDetalle = this.detalleRepository.create({
      estado: true,
      examen: examen,
      pregunta: pregunta,
      usuario_ingreso: usuario,
      fecha_modifica: null,
      respuesta_dada: createDetalleDto.respuesta_dada,
    });
  
    return this.detalleRepository.save(newDetalle);
  }

  async updateDetalle(codigo_detalle: number, updateDetalle: UpdateDetalleDto) {
    const detalleExistente = await this.detalleRepository.findOne({
      where: { codigo_detalle },
    });

    if (!detalleExistente) {
      throw new HttpException(
        'La respuesta con el código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: updateDetalle.usuario_modifica } });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    const examen = await this.examenRepository.findOne({ where: { codigo_examen: updateDetalle.examen } });

    const pregunta = await this.preguntaRepository.findOne({ where: { codigo_pregunta: updateDetalle.pregunta } });

    if (!examen) {
      throw new HttpException('Examen no encontrado.', HttpStatus.NOT_FOUND);
    }

    if (!pregunta) {
      throw new HttpException('Pregunta no encontrada.', HttpStatus.NOT_FOUND);
    }

    detalleExistente.examen = examen;
    detalleExistente.pregunta = pregunta;
    detalleExistente.respuesta_dada = updateDetalle.respuesta_dada;
    detalleExistente.usuario_modifica = usuario;
    detalleExistente.fecha_modifica = new Date();

    return this.detalleRepository.save(detalleExistente);
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
