import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Pregunta } from './model/pregunta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';

@Injectable()
export class PreguntaService {
  constructor(
    @InjectRepository(Pregunta)
    private preguntaRepository: Repository<Pregunta>
  ) {}

  async findAll() {
    return this.preguntaRepository.find({
      where: { estado: true },
    });
  }

  async findById(codigo_pregunta: number) {  // Cambiado a codigo_pregunta
    const preguntaExistente = await this.preguntaRepository.findOne({
      where: { codigo_pregunta, estado: true },  // Cambiado a codigo_pregunta
    });

    if (!preguntaExistente) {
      throw new HttpException(
        'La pregunta con el código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    return preguntaExistente;
  }

  async createPregunta(createPreguntaDto: CreatePreguntaDto) {
    const newPregunta = this.preguntaRepository.create({
      estado: true,
      ...createPreguntaDto,
    });
    return this.preguntaRepository.save(newPregunta);
  }

  async updatePregunta(codigo_pregunta: number, updatePreguntaDto: UpdatePreguntaDto) {  // Cambiado a codigo_pregunta
    const preguntaExistente = await this.preguntaRepository.findOne({
      where: { codigo_pregunta },  // Cambiado a codigo_pregunta
    });

    if (!preguntaExistente) {
      throw new HttpException(
        'La pregunta con el código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatePregunta = Object.assign(preguntaExistente, updatePreguntaDto);
    return this.preguntaRepository.save(updatePregunta);
  }

  async desactivePregunta(codigo_pregunta: number) {  // Cambiado a codigo_pregunta
    const preguntaExistente = await this.preguntaRepository.findOne({
      where: { codigo_pregunta },  // Cambiado a codigo_pregunta
    });

    if (!preguntaExistente) {
      throw new HttpException(
        'La pregunta con el código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }
    
    // Cambiar el estado a false en lugar de eliminar el registro
    preguntaExistente.estado = false;

    const resultado = await this.preguntaRepository.save(preguntaExistente);
    return resultado;
  }
}
