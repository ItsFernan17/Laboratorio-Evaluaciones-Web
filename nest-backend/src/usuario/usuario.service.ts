import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';
import { Usuario } from './model/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>, 
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

    async findByName(nombre_usuario: string) {
      const usuarioExistente = await this.usuarioRepository.findOne({
        where: { nombre_usuario, estado: true },
      });
  
      if (!usuarioExistente) {
        return new HttpException(
          'El Usuario no existe en la base de datos.',
          HttpStatus.NOT_FOUND,
        );
      }
  
      return usuarioExistente;
    }

    async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario | string> {
      const nombreUsuario = this.generateUsername(createUsuarioDto.nombre_completo);

      const usuarioExistente = await this.usuarioRepository.findOne({
        where: { nombre_usuario: nombreUsuario},
      });

      if (usuarioExistente) {
         new HttpException('El usuario ya existe en la base de datos.', 409)
      }

      const newUsuario = this.usuarioRepository.create({
        estado: true,
        nombre_usuario: nombreUsuario,
        ...createUsuarioDto,
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
    
      // Only update the fields that are present in updateUsuarioDto
      Object.keys(updateUsuarioDto).forEach(key => {
        if (updateUsuarioDto[key] !== undefined) {
          usuarioExistente[key] = updateUsuarioDto[key];
        }
      });
    
      return this.usuarioRepository.save(usuarioExistente);
    }


  async desactiveUsuario(nombre_usuario: string) {
    const examenExistente = await this.usuarioRepository.findOne({
      where: { nombre_usuario },
    });

    if (!examenExistente) {
      return new HttpException(
        'El Examen con el código proporcionado no existe en la base de datos.',
        HttpStatus.NOT_FOUND,
      );
    }
    examenExistente.estado = false;

    const resultado = await this.usuarioRepository.save(examenExistente);
    return resultado;
  }
}
