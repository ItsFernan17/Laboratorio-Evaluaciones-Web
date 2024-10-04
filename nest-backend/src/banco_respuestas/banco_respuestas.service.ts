
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BancoRespuestas } from './model/banco_respuestas.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBancoRespuestasDto} from './dto/create-banco_respuestas.dto';
import { UpdateBancoRespuestasDto } from './dto/update-banco_respuestas.dto';


@Injectable()
export class BancoRespuestasService {
  constructor(
    @InjectRepository(BancoRespuestas)
    private bancoRespuestasRepository: Repository<BancoRespuestas>
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
    const newBancoRespuesta = this.bancoRespuestasRepository.create({
      estado: true,
      ...createBancoRespuestaDto,
    });
    return this.bancoRespuestasRepository.save(newBancoRespuesta);
  }

  async updateBancoRespuesta(codigo_respuesta: number, updateBancoRespuestaDto: UpdateBancoRespuestasDto) {
    const bancoRespuestaExistente = await this.bancoRespuestasRepository.findOne({
      where: { codigo_respuesta },
    });

    if (!bancoRespuestaExistente) {
      return new HttpException(
        'La respuesta con el código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    const updateBancoRespuesta = Object.assign(bancoRespuestaExistente, updateBancoRespuestaDto);
    return this.bancoRespuestasRepository.save(updateBancoRespuesta);
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
