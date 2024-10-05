
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BancoRespuestas } from './model/banco_respuestas.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBancoRespuestasDto, UpdateBancoRespuestasDto} from './dto';
import { Usuario } from 'src/usuario/model/usuario.entity';


@Injectable()
export class BancoRespuestasService {
  constructor(
    @InjectRepository(BancoRespuestas)
    private bancoRespuestasRepository: Repository<BancoRespuestas>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll() {
    return this.bancoRespuestasRepository.find({
      where: { estado: true },
    });
  }

  async findById(codigo_respuesta: number) {
    const bancoRespuestaExistente = await this.bancoRespuestasRepository.findOne({
      where: { codigo_respuesta, estado: true },
    });

    if (!bancoRespuestaExistente) {
      return new HttpException(
        'La respuesta con el código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    return bancoRespuestaExistente;
  }

  async createBancoRespuesta(createBancoRespuestaDto: CreateBancoRespuestasDto) {

    const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: createBancoRespuestaDto.usuario_ingreso } });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    const newBancoRespuesta = this.bancoRespuestasRepository.create({
      estado: true,
      usuario_ingreso: usuario,
      fecha_modifica: null,
      respuesta: createBancoRespuestaDto.respuesta,
    });

    return this.bancoRespuestasRepository.save(newBancoRespuesta);
  }

  async updateBancoRespuesta(codigo_respuesta: number, updateBancoRespuestaDto: UpdateBancoRespuestasDto) {
    const bancoRespuestaExistente = await this.bancoRespuestasRepository.findOne({
      where: { codigo_respuesta },
    });

    if (!bancoRespuestaExistente) {
      throw new HttpException(
        'La respuesta con el código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: updateBancoRespuestaDto.usuario_modifica } });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
    
    bancoRespuestaExistente.respuesta = updateBancoRespuestaDto.respuesta;
    bancoRespuestaExistente.usuario_modifica = usuario;
    bancoRespuestaExistente.fecha_modifica = new Date();

    return this.bancoRespuestasRepository.save(bancoRespuestaExistente);
  }

  async desactiveBancoRespuesta(codigo_respuesta: number) {
    const bancoRespuestaExistente = await this.bancoRespuestasRepository.findOne({
      where: { codigo_respuesta },
    });

    if (!bancoRespuestaExistente) {
      return new HttpException(
        'La respuesta con el código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }
    
    // Cambiar el estado a false en lugar de eliminar el registro
    bancoRespuestaExistente.estado = false;

    const resultado = await this.bancoRespuestasRepository.save(bancoRespuestaExistente);
    return resultado;
  }
}
