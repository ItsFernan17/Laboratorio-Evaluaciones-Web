import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Empleo } from './model/empleo.entity';  // Asegúrate de que la ruta sea correcta
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmpleoDto } from './dto/create-empleo.dto';  // Asegúrate de que la ruta sea correcta
import { UpdateEmpleoDto } from './dto/update-empleo.dto';  // Asegúrate de que la ruta sea correcta
import { Usuario } from 'src/usuario/model/usuario.entity';

@Injectable()
export class EmpleoService {
  constructor(
    @InjectRepository(Empleo)
    private empleoRepository: Repository<Empleo>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll() {
    return this.empleoRepository.find({
      where: { estado: true },
    });
  }

  async findById(ceom: string) {
    const empleoExistente = await this.empleoRepository.findOne({
      where: { ceom, estado: true },
    });

    if (!empleoExistente) {
      return new HttpException(
        'El empleo con el CEOM proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    return empleoExistente;
  }

  async createEmpleo(createEmpeloDto: CreateEmpleoDto) {

    const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: createEmpeloDto.usuario_ingreso} });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    const newEmpleo = this.empleoRepository.create({
      ceom: createEmpeloDto.ceom,
      estado: true,
      usuario_ingreso: usuario,
      fecha_modifica: null,
      descripcion: createEmpeloDto.descripcion,
    });

    return this.empleoRepository.save(newEmpleo);
  }

  async updateEmpleo(ceom: string, UpdateEmpleoDto: UpdateEmpleoDto) {
    const empleoExistente = await this.empleoRepository.findOne({
      where: { ceom },
    });

    if (!empleoExistente) {
      throw new HttpException(
        'El empleo con el código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: UpdateEmpleoDto.usuario_modifica } });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
    
    empleoExistente.descripcion = UpdateEmpleoDto.descripcion;
    empleoExistente.usuario_modifica = usuario;
    empleoExistente.fecha_modifica = new Date();

    return this.empleoRepository.save(empleoExistente);
  }



  async desactiveEmpleo(ceom: string) {
    const empleoExistente = await this.empleoRepository.findOne({
      where: { ceom },
    });

    if (!empleoExistente) {
      return new HttpException(
        'El empleo con el CEOM proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }
    
    // Cambiar el estado a false en lugar de eliminar el registro
    empleoExistente.estado = false;

    const resultado = await this.empleoRepository.save(empleoExistente);
    return resultado;
  }
}
