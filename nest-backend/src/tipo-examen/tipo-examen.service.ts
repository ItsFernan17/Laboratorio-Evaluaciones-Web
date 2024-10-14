import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/model/usuario.entity';
import { TipoExamen } from './model/tipo-examen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTipoExamenDto, UpdateTipoExamenDto } from './dto';
import { Empleo } from 'src/empleo/model/empleo.entity';

@Injectable()
export class TipoExamenService {

    constructor(
        @InjectRepository(TipoExamen)
        private tipoExamenRepository: Repository<TipoExamen>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Empleo)
        private readonly empleoRepository: Repository<Empleo>,
    ) {}

    async findAll(){
        return this.tipoExamenRepository.find({
            where: { estado: true },
        });
    }

    async findByTipo(description: string) {
        return await this.tipoExamenRepository.findOne({ where: { description } });
    }


    async findById(codigo_tipoE: number){
        const tipoExamenExistente = await this.tipoExamenRepository.findOne({
            where: { codigo_tipoE, estado: true },
        });

        if (!tipoExamenExistente) {
            return new HttpException(
                'El tipo de examen con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        return tipoExamenExistente;
    }

    async createTipoExamen(createTipoExamenDto: CreateTipoExamenDto){

        const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: createTipoExamenDto.usuario_ingreso} });

        if (!usuario) {
            throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }

        const empleo = await this.empleoRepository.findOne({ where: { ceom: createTipoExamenDto.ceom} });

        if (!empleo) {
            throw new HttpException('Empleo no encontrado.', HttpStatus.NOT_FOUND);
        }

        const newTipoExamen = this.tipoExamenRepository.create({
            description: createTipoExamenDto.descripcion,
            estado: true,
            ceom: empleo,
            usuario_ingreso: usuario,
            fecha_ingreso: new Date(),
            fecha_modifica: null
        });

        return this.tipoExamenRepository.save(newTipoExamen);
    }

    async updateTipoExamen(codigo_tipoE: number, updateTipoExamenDto: UpdateTipoExamenDto){
        const tipoExamenExistente = await this.tipoExamenRepository.findOne({
            where: { codigo_tipoE },
        });

        if (!tipoExamenExistente) {
            return new HttpException(
                'El tipo de examen con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: updateTipoExamenDto.usuario_modifica} });

        if (!usuario) {
            throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }

        const empleo = await this.tipoExamenRepository.findOne({ where: { description: updateTipoExamenDto.descripcion} });

        if (empleo) {
            throw new HttpException('El tipo de examen ya existe.', HttpStatus.FOUND);
        }

        tipoExamenExistente.description = updateTipoExamenDto.descripcion;
        tipoExamenExistente.ceom = empleo.ceom;
        tipoExamenExistente.usuario_modifica = usuario;
        tipoExamenExistente.fecha_modifica = new Date();

        return this.tipoExamenRepository.save(tipoExamenExistente);
    }

    async desactiveTipoExamen(codigo_tipoE: number){
        const tipoExamenExistente = await this.tipoExamenRepository.findOne({
            where: { codigo_tipoE },
        });

        if (!tipoExamenExistente) {
            return new HttpException(
                'El tipo de examen con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        tipoExamenExistente.estado = false;

        return this.tipoExamenRepository.save(tipoExamenExistente);
    }

}
