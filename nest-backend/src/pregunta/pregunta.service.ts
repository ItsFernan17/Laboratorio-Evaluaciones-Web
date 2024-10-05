import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Pregunta } from './model/pregunta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { Usuario } from 'src/usuario/model/usuario.entity';
import { BancoRespuestas } from 'src/banco_respuestas/model/banco_respuestas.entity';

@Injectable()
export class PreguntaService {
  constructor(
    @InjectRepository(Pregunta)
    private preguntaRepository: Repository<Pregunta>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(BancoRespuestas)
    private readonly respuestaRepository: Repository<BancoRespuestas>,
  ) {}

  async findAll() {
    return this.preguntaRepository.find({
      where: { estado: true },
    });
  }

  async findById(codigo_pregunta: number) {
    const preguntaExistente = await this.preguntaRepository.findOne({
      where: { codigo_pregunta, estado: true },
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

    const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: createPreguntaDto.usuario_ingreso } });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    const respuesta = await this.respuestaRepository.findOne({ where: { codigo_respuesta: createPreguntaDto.banco_respuestas } });

    if (!respuesta) {
      throw new HttpException('Respuesta no encontrada.', HttpStatus.NOT_FOUND);
    }

    // Create the new question
    const newPregunta = this.preguntaRepository.create({
      estado: true,
      usuario_ingreso: usuario,
      banco_respuestas: respuesta,
      fecha_modifica: null,
      enunciado: createPreguntaDto.enunciado,
    });

    return this.preguntaRepository.save(newPregunta);
  }
  
  async updatePregunta(codigo_pregunta: number, updatePreguntaDto: UpdatePreguntaDto) {
    const preguntaExistente = await this.preguntaRepository.findOne({ where: { codigo_pregunta } });
    if (!preguntaExistente) {
      throw new HttpException('La pregunta con el código proporcionado no existe en la base de datos.', HttpStatus.NOT_FOUND);
    }

    const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: updatePreguntaDto.usuario_modifica } });
    if (!usuario) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    preguntaExistente.enunciado = updatePreguntaDto.enunciado;
    preguntaExistente.usuario_modifica = usuario;
    preguntaExistente.fecha_modifica = new Date();

    return this.preguntaRepository.save(preguntaExistente);
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
