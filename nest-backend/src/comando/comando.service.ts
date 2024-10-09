import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Comando } from './model/comando.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/model/usuario.entity';
import { CreateComandoDto, UpdateComandoDto } from './dto';

@Injectable()
export class ComandoService {
    constructor(
        @InjectRepository(Comando)
        private comandoRepository: Repository<Comando>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ){}


    async findAll() {
        return this.comandoRepository.find({
            where: { estado: true },
        });
    }

    async findById(codigo_comando: number) {
        const comandoExistente = await this.comandoRepository.findOne({
            where: { codigo_comando, estado: true },
        });

        if (!comandoExistente) {
            return new HttpException(
                'El comando con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        return comandoExistente;
    }

    async createComando(createComandoDto: CreateComandoDto) {
        
        const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: createComandoDto.usuario_ingreso} });
      
        if (!usuario) {
          throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }
      
        const newComando = this.comandoRepository.create({
          estado: true,
          usuario_ingreso: usuario,
          fecha_modifica: null,
         nombre_comando: createComandoDto.nombre_comando,
        });
      
        return this.comandoRepository.save(newComando);
      }

    async updateComando(codigo_comando: number, updateComandoDto: UpdateComandoDto) {
        const comandoExistente = await this.comandoRepository.findOne({
            where: { codigo_comando },
        });

        if (!comandoExistente) {
            return new HttpException(
                'El comando con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: updateComandoDto.usuario_modifica } });

        if (!usuario) {
            throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }

        comandoExistente.usuario_modifica = usuario;
        comandoExistente.fecha_modifica = new Date();
        comandoExistente.nombre_comando = updateComandoDto.nombre_comando;

        return this.comandoRepository.save(comandoExistente);
    }
    
    async desactiveComando(codigo_comando: number) {
        const comandoExistente = await this.comandoRepository.findOne({
            where: { codigo_comando },
        });

        if (!comandoExistente) {
            return new HttpException(
                'El comando con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        comandoExistente.estado = false;

        return this.comandoRepository.save(comandoExistente);
    }
}
