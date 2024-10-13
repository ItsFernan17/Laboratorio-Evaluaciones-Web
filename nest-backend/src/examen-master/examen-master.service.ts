import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamenMaster } from './model/examen-master.entity';
import { CreateExamenMasterDto, UpdateExamenMasterDto } from './dto';
import { SerieExamen } from 'src/serie-examen/model/serie-examen.entity';
import { Pregunta } from 'src/pregunta/model/pregunta.entity';
import { Usuario } from 'src/usuario/model/usuario.entity';
import { PreguntaService } from 'src/pregunta/pregunta.service';
import { SerieExamenService } from 'src/serie-examen/serie-examen.service';
import { SerieService } from 'src/serie/serie.service';
import { ExamenService } from 'src/examen/examen.service';
import { CreateExamenDto } from 'src/examen/dto';
import { CreateSerieDto } from 'src/serie/dto';
import { TipoExamenService } from 'src/tipo-examen/tipo-examen.service';


@Injectable()
export class ExamenMasterService {

    constructor(
        @InjectRepository(ExamenMaster)
        private examenMasterRepository: Repository<ExamenMaster>,
        @InjectRepository(SerieExamen)
        private serieExamenRepository: Repository<SerieExamen>,
        @InjectRepository(Pregunta)
        private preguntaRepository: Repository<Pregunta>,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private readonly preguntaService: PreguntaService,
        private readonly serieExamenService: SerieExamenService,
        private readonly serieService: SerieService,
        private readonly examenService: ExamenService,
        private readonly tipo_examen: TipoExamenService,

    ){}

    async findAll(){
        return this.examenMasterRepository.find({
            where: { estado: true },
        });
    }

    async findById(codigo_master: number){
        const examenMasterExistente = await this.examenMasterRepository.findOne({
            where: { codigo_master, estado: true },
        });

        if (!examenMasterExistente) {
            return new HttpException(
                'El examen-master con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        return examenMasterExistente;
    }

    async createExamenMaster(createExamenMasterDto: CreateExamenMasterDto): Promise<ExamenMaster> {
        const serie_examen = await this.serieExamenRepository.findOne({ where: { codigo_se_ex: createExamenMasterDto.serie_examen } });
        const pregunta = await this.preguntaRepository.findOne({ where: { codigo_pregunta: createExamenMasterDto.pregunta } });
        const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: createExamenMasterDto.usuario_ingreso } });
    
        if (!serie_examen) {
            throw new HttpException('Serie de examen no encontrada.', HttpStatus.NOT_FOUND);
        }
    
        if (!pregunta) {
            throw new HttpException('Pregunta no encontrada.', HttpStatus.NOT_FOUND);
        }
    
        if (!usuario) {
            throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }
    
        const newExamenMaster = this.examenMasterRepository.create({
            serie_examen: serie_examen,
            pregunta: pregunta,
            estado: true,
            usuario_ingreso: usuario,
            fecha_ingreso: new Date(),
            fecha_modifica: null
        });
    
        return this.examenMasterRepository.save(newExamenMaster);
    }

    async updateExamenMaster(codigo_master: number, updateExamenMasterDto: UpdateExamenMasterDto){
        
        const examenMasterExistente = await this.examenMasterRepository.findOne({
            where: { codigo_master },
        });

        if (!examenMasterExistente) {
            return new HttpException(
                'La pregunta-respuesta con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: updateExamenMasterDto.usuario_modifica} });
        const pregunta = await this.preguntaRepository.findOne({ where: { codigo_pregunta: updateExamenMasterDto.pregunta} });
        const serie_examen = await this.serieExamenRepository.findOne({ where: { codigo_se_ex: updateExamenMasterDto.serie_examen} });

        if (!usuario) {
            throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }

        if (!pregunta) {
            throw new HttpException('Pregunta no encontrada.', HttpStatus.NOT_FOUND);
        }

        examenMasterExistente.serie_examen = serie_examen;
        examenMasterExistente.pregunta = pregunta;
        examenMasterExistente.usuario_modifica = usuario;
        examenMasterExistente.fecha_modifica = new Date();

        return this.examenMasterRepository.save(examenMasterExistente);  

    }


    async desactiveExamenMaster(codigo_master: number){
        const examenMasterExistente = await this.examenMasterRepository.findOne({
            where: { codigo_master },
        });

        if (!examenMasterExistente) {
            return new HttpException(
                'La pregunta-respuesta con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        examenMasterExistente.estado = false;

        return this.examenMasterRepository.save(examenMasterExistente);
    }
}
