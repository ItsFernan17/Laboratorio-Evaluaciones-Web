import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './model/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,  // Inyecta el repositorio de Usuario
  ) { }

  // -------------------- CREATE
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const newUsuario = this.usuarioRepository.create(createUsuarioDto); // Crea una instancia de Usuario
    return await this.usuarioRepository.save(newUsuario);  // Guarda en la base de datos
  }

  

  // -------------------- FINDALL
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();  // Recupera todos los usuarios
  }

  // -------------------- FIND ONE
  async findOne(nommbre_usuario: string): Promise<Usuario> {
    return await this.usuarioRepository.findOne({ where: { NOMBRE_USUARIO: nommbre_usuario } });  // Encuentra un usuario por ID
  }

  // ------------------- UPDATE
  async update(nombre_usuario: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    await this.usuarioRepository.update(nombre_usuario, updateUsuarioDto);  // Actualiza un usuario
    return this.findOne(nombre_usuario);  // Retorna el usuario actualizado
  }

  // -------------------- DELETE
  async remove(nombre_usuario: string): Promise<void> {
    await this.usuarioRepository.delete(nombre_usuario);  // Elimina el usuario
  }
}
