import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { } from './dto/delete-usuario.dto'
import { Usuario } from './model/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,  // Inyecta el repositorio de Usuario
  ) { }



  // ------------------------------------------------------------------------------------------- CREATE
    // Función para generar el nombre de usuario a partir del nombre completo
    private generateUsername(nombreCompleto: string): string { 
      return nombreCompleto
        .split(' ') // Divide el nombre completo por espacios
        .map(palabra => palabra.charAt(0).toLowerCase()) // Toma la primera letra de cada palabra
        .join(''); // Une las letras para formar el nombre de usuario
    }

    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario | string> {
      // Genera un nombre de usuario a partir del nombre completo
      let nombreUsuario = this.generateUsername(createUsuarioDto.NOMBRE_COMPLETO);
    
      // Verifica si el nombre de usuario ya existe
      let usuarioExistente = await this.usuarioRepository.findOne({
        where: { NOMBRE_USUARIO: nombreUsuario },
      });
    
      // Si el nombre de usuario ya existe, agrega números para hacerlo único
      let contador = 1;
      while (usuarioExistente) {
        nombreUsuario = `${this.generateUsername(createUsuarioDto.NOMBRE_COMPLETO)}${contador}`;
        usuarioExistente = await this.usuarioRepository.findOne({
          where: { NOMBRE_USUARIO: nombreUsuario },
        });
        contador++;
      }
    
      // Asigna el nombre de usuario al DTO
      createUsuarioDto.NOMBRE_USUARIO = nombreUsuario;  // Asegúrate de que esta línea esté presente
    
      // Crea y guarda el nuevo usuario
      const newUsuario = this.usuarioRepository.create(createUsuarioDto);
      return await this.usuarioRepository.save(newUsuario);
    }
    
  // ------------------------------------------------------------------------------------------- CREATE









  // -------------------- FINDALL
  async findAll(): Promise<Usuario[]> {
    const usuario = await this.usuarioRepository.find({ where: { ESTADO: true } })
    return usuario;
  }

  // -------------------- FIND ONE
  async findOne(nommbre_usuario: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { NOMBRE_USUARIO: nommbre_usuario, ESTADO: true } })
    return usuario;
  }

  // ------------------- UPDATE
  async update(nombre_usuario: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario | string> {
    const usuario = await this.usuarioRepository.findOne({ where: { NOMBRE_USUARIO: nombre_usuario } });
    if (!usuario) {
      return 'Usuario no encontrado';
    }
    // Actualiza los campos del usuario con los datos recibidos
    Object.assign(usuario, updateUsuarioDto);

    return this.usuarioRepository.save(usuario);
  }


  // -------------------- DELETE
  async remove(nombre_usuario: string): Promise<void | any> {
    const usuario = await this.usuarioRepository.findOne({ where: { NOMBRE_USUARIO: nombre_usuario } });
    if (usuario) {
      usuario.ESTADO = false; // Cambia el estado a false para eliminar lógicamente
      await this.usuarioRepository.save(usuario); // Guarda el cambio en la base de datos
      return 'Usuario ' +usuario.NOMBRE_USUARIO+ ' eliminado'
    }
  }
}
