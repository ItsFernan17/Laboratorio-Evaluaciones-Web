import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MotivoEvaluacion } from './model/motivo-apto.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/model/usuario.entity';
import { CreateMotivoAptoDto, UpdateMotivoAptoDto } from './dto';

@Injectable()
export class MotivoAptoService {
    constructor(
        @InjectRepository(MotivoEvaluacion)
        private readonly motivoAptoRepository: Repository<MotivoEvaluacion>,

        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    async findAll() {
        return this.motivoAptoRepository.find({
            where: { estado: true },
        });
    }

    async findById(codigo_motivo: number) {
        const motivoExistente = await this.motivoAptoRepository.findOne({
            where: { codigo_motivo, estado: true },
        });

        if (!motivoExistente) {
            return new HttpException(
                'El motivo con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        return motivoExistente;
    }

    async createMotivo(createMotivoDto: CreateMotivoAptoDto){
        const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: createMotivoDto.usuario_ingreso } });

        if (!usuario) {
            throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }

        const newMotivo = this.motivoAptoRepository.create({
            nombre_motivo: createMotivoDto.nombre_motivo,
            estado: true,
            usuario_ingreso: usuario,
            fecha_modifica: null,
        });

        return this.motivoAptoRepository.save(newMotivo);
    }


    async updateMotivo(codigo_motivo: number, updateMotivoDto: UpdateMotivoAptoDto) {
        const motivoExistente = await this.motivoAptoRepository.findOne({ where: { codigo_motivo } });

        if (!motivoExistente) {
          throw new HttpException('La pregunta con el código proporcionado no existe en la base de datos.', HttpStatus.NOT_FOUND);
        }
    
        const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: updateMotivoDto.usuario_modifica } });
        if (!usuario) {
          throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }
    
        motivoExistente.nombre_motivo = updateMotivoDto.nombre_motivo;
        motivoExistente.usuario_modifica = usuario;
        motivoExistente.fecha_modifica = new Date();

    
        return this.motivoAptoRepository.save(motivoExistente);
      }

    async desactiveMotivo(codigo_motivo: number) {
        const motivoExistente = await this.motivoAptoRepository.findOne({
            where: { codigo_motivo },
        });

        if (!motivoExistente) {
            return new HttpException(
                'El motivo con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        motivoExistente.estado = false;

        return this.motivoAptoRepository.save(motivoExistente);
    }
    
}
