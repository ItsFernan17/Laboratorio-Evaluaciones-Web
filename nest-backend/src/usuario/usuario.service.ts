import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto, UpdateUsuarioDto} from './dto';
import { Usuario } from './model/usuario.entity';
import { Departamento } from 'src/seed-db/departamento/model/departamento.entity';
import { Grado } from 'src/seed-db/grado/model/grado.entity';
import { Poblacion } from 'src/seed-db/poblacion/model/poblacion.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>, 
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
    @InjectRepository(Grado)
    private readonly gradoRepository: Repository<Grado>,
    @InjectRepository(Poblacion)
    private readonly poblacionRepository: Repository<Poblacion>,
  ) { }

  private generateUsername(nombreCompleto: string): string { 
    const partes = nombreCompleto.split(' ');
  
    if (partes.length < 2) {
      throw new Error('El nombre completo debe contener al menos un nombre y un apellido.');
    }
  
    const primerNombre = partes[0];
    const primerApellido = partes.length > 2 ? partes[2] : partes[1];
    
    return `${primerNombre.charAt(0).toLowerCase()}${primerApellido.toLowerCase()}`;
  }

  async findAll() {
    return this.usuarioRepository.find({
      where: { estado: true },
    });
  }

  async findById(nombre_usuario: string) {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { nombre_usuario, estado: true },
    });

    if (!usuarioExistente) {
      return new HttpException(
        'El Usuario con el nombre proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    return usuarioExistente;
  }

  async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario | string> {
    const nombreUsuario = this.generateUsername(createUsuarioDto.nombre_completo);
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { nombre_usuario: nombreUsuario },
    });
  
    if (usuarioExistente) {
      throw new HttpException('El usuario ya existe en la base de datos.', 409);
    }
  
    // Fetch related entities
    const residencia = await this.departamentoRepository.findOne({ where: { codigo_departamento: createUsuarioDto.residencia } });
    const grado = await this.gradoRepository.findOne({ where: { codigo_grado: createUsuarioDto.grado } });
    const poblacion = await this.poblacionRepository.findOne({ where: { codigo_poblacion: createUsuarioDto.poblacion } });
  
    if (!residencia) {
      throw new HttpException('Departamento no encontrado.', HttpStatus.NOT_FOUND);
    }
  
    if (!grado) {
      throw new HttpException('Grado no encontrado.', HttpStatus.NOT_FOUND);
    }
  
    if (!poblacion) {
      throw new HttpException('Población no encontrada.', HttpStatus.NOT_FOUND);
    }
  
    const newUsuario = this.usuarioRepository.create({
      estado: true,
      nombre_usuario: nombreUsuario,
      ...createUsuarioDto,
      residencia: residencia,
      grado: grado,
      poblacion: poblacion,
    });
  
    return this.usuarioRepository.save(newUsuario);
  }

  async updateUsuario(nombre_usuario: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { nombre_usuario, estado: true },
    });
  
    if (!usuarioExistente) {
      throw new HttpException(
        'El Usuario con el nombre proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }
  
    // Update fields from DTO
    Object.keys(updateUsuarioDto).forEach(key => {
      if (updateUsuarioDto[key] !== undefined) {
        usuarioExistente[key] = updateUsuarioDto[key];
      }
    });
  
    // Fetch and update related entities if provided
    if (updateUsuarioDto.residencia) {
      const residencia = await this.departamentoRepository.findOne({ where: { codigo_departamento: updateUsuarioDto.residencia } });
      if (!residencia) {
        throw new HttpException('Departamento no encontrado.', HttpStatus.NOT_FOUND);
      }
      usuarioExistente.residencia = residencia;
    }
  
    if (updateUsuarioDto.grado) {
      const grado = await this.gradoRepository.findOne({ where: { codigo_grado: updateUsuarioDto.grado } });
      if (!grado) {
        throw new HttpException('Grado no encontrado.', HttpStatus.NOT_FOUND);
      }
      usuarioExistente.grado = grado;
    }
  
    if (updateUsuarioDto.poblacion) {
      const poblacion = await this.poblacionRepository.findOne({ where: { codigo_poblacion: updateUsuarioDto.poblacion } });
      if (!poblacion) {
        throw new HttpException('Población no encontrada.', HttpStatus.NOT_FOUND);
      }
      usuarioExistente.poblacion = poblacion;
    }
  
    return this.usuarioRepository.save(usuarioExistente);
  }

  async desactiveUsuario(nombre_usuario: string) {
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { nombre_usuario },
    });

    if (!usuarioExistente) {
      throw new HttpException(
        'El Usuario con el nombre proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }

    usuarioExistente.estado = false;
    return this.usuarioRepository.save(usuarioExistente);
  }

}
