import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MotivoNoApto } from './model/motivo-noapto.entity';
import { Usuario } from 'src/usuario/model/usuario.entity';
import { CreateMotivoNoAptoDto, UpdateMotivoNoAptoDto} from './dto';


@Injectable()
export class MotivoNoaptoService {
    constructor(
        @InjectRepository(MotivoNoApto)
        private motivoNoAptoRepository: Repository<MotivoNoApto>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    async findAll() {
        return this.motivoNoAptoRepository.find({
            where: { estado: true },
        });
    }

    async findById(codigo_no_apto: number) {
        const motivoExistente = await this.motivoNoAptoRepository.findOne({
            where: { codigo_no_apto, estado: true },
        });

        if (!motivoExistente) {
            return new HttpException(
                'El motivo con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        return motivoExistente;
    }

    async createNoMotivo(createMotivoNoDto: CreateMotivoNoAptoDto){
        const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: createMotivoNoDto.usuario_ingreso } });

        if (!usuario) {
            throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }

        const newNoMotivo = this.motivoNoAptoRepository.create({
            nombre_motivo: createMotivoNoDto.nombre_motivo,
            estado: true,
            usuario_ingreso: usuario,
            fecha_modifica: null,
        });

        return this.motivoNoAptoRepository.save(newNoMotivo);
    }

    async updateNoMotivo(codigo_no_apto: number, updateMotivoNoDto: UpdateMotivoNoAptoDto) {
        const motivoExistente = await this.motivoNoAptoRepository.findOne({ where: { codigo_no_apto } });

        if (!motivoExistente) {
            return new HttpException(
                'El motivo con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: updateMotivoNoDto.usuario_modifica } });

        if (!usuario) {
            throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }

        motivoExistente.nombre_motivo = updateMotivoNoDto.nombre_motivo;
        motivoExistente.usuario_modifica = usuario;
        motivoExistente.fecha_modifica = new Date();

        return this.motivoNoAptoRepository.save(motivoExistente);
    }

    async desactiveNoMotivo(codigo_no_apto: number) {
        const motivoExistente = await this.motivoNoAptoRepository.findOne({
            where: { codigo_no_apto },
        });

        if (!motivoExistente) {
            return new HttpException(
                'El motivo con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        motivoExistente.estado = false;

        return this.motivoNoAptoRepository.save(motivoExistente);
    }
}
