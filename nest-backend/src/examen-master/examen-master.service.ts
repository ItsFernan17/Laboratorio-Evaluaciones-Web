import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamenMaster } from './model/examen-master.entity';
import { CreateExamenMasterDto, UpdateExamenMasterDto } from './dto';
import { SerieExamen } from 'src/serie-examen/model/serie-examen.entity';
import { Pregunta } from 'src/pregunta/model/pregunta.entity';
import { Usuario } from 'src/usuario/model/usuario.entity';
import { ExamenMasterDto } from './dto/create-examen.dto';
import { TipoExamen } from 'src/tipo-examen/model/tipo-examen.entity';
import { Examen } from 'src/examen/model/examen.entity';
import { SerieExamenService } from 'src/serie-examen/serie-examen.service';
import { PreguntaService } from 'src/pregunta/pregunta.service';
import { Serie } from 'src/serie/model/serie.entity';
import { Respuesta } from 'src/respuesta/model/respuesta.entity';
import { PreguntaRespuesta } from 'src/pregunta-respuesta/model/pregunta-respuesta.entity';


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
        @InjectRepository(TipoExamen)
        private tipoExamenRepository: Repository<TipoExamen>,
        @InjectRepository(Examen)
        private examenRepository: Repository<Examen>,
        @InjectRepository(Serie)
        private serieRepository: Repository<Serie>,
        @InjectRepository(PreguntaRespuesta)
        private preguntaRespuestaRepository: Repository<PreguntaRespuesta>,
        private readonly serieExamenService: SerieExamenService,
        private readonly preguntasService: PreguntaService,

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

    async createExamen(createExamenMasterDto: ExamenMasterDto){
        
        const tipoExamen = await this.tipoExamenRepository.findOne({ where: { codigo_tipoE: createExamenMasterDto.tipo_examen } });
        if (!tipoExamen) {
          throw new HttpException('El tipo de examen no encontrado.', HttpStatus.NOT_FOUND);
        }
    
        const newExamen = this.examenRepository.create({
          fecha_evaluacion: createExamenMasterDto.fecha_evaluacion,
          estado: true,
          tipo_examen: tipoExamen,
          punteo_maximo: createExamenMasterDto.punteo_maximo,
          usuario_ingreso: null,
          fecha_ingreso: new Date(),
          fecha_modifica: null,
        });

        const examen = await this.examenRepository.save(newExamen);

        const seriesData = [];

        for (const serieExamenDto of createExamenMasterDto.series) {
            const serie = await this.serieRepository.findOne({ where: { codigo_serie: serieExamenDto.serie } });
            if (!serie) {
              throw new NotFoundException(`Serie con ID ${serieExamenDto.serie} no encontrada`);
            }
      
            const serieExamen = await this.serieExamenService.createSerieExamen({
                serie: serie.codigo_serie,
                examen: examen.codigo_examen,
                usuario_ingreso: null,
            });
      
            const preguntasData = [];
            for (const preguntaIdDto of serieExamenDto.preguntas) {
              const pregunta = await this.preguntasService.findById(preguntaIdDto.pregunta);
              if (!pregunta) {
                throw new NotFoundException(`Pregunta con ID ${preguntaIdDto.pregunta} no encontrada`);
              }
      
              preguntasData.push(pregunta);

              const createExamenMaster: CreateExamenMasterDto = {
                serie_examen: serieExamen.codigo_se_ex,
                pregunta: pregunta['codigo_pregunta'],
                usuario_ingreso: null,
              }

              await this.createExamenMaster(createExamenMaster);

            }
      
            seriesData.push({
              serie,
              serieExamen,
              preguntas: preguntasData,
            });

          }

          return new ExamenMasterDto(
            tipoExamen.codigo_tipoE,
            examen.fecha_evaluacion,
            examen.punteo_maximo,
            examen.estado,
            seriesData,
          );
    }

    async getExamenDetail(codigo_examen: number) {

        const examen = await this.examenRepository.findOne({
          where: { codigo_examen: codigo_examen },
          relations: ['tipo_examen'],
        });
      
        if (!examen) {
          throw new NotFoundException(`Examen con ID ${codigo_examen} no encontrado`);
        }
      
        const seriesExamen = await this.serieExamenRepository.find({
          where: { examen: examen},
          relations: ['serie'],
        });
      
        const result = {
          fecha_evaluacion: examen.fecha_evaluacion,
          tipo_examen: examen.tipo_examen.description,
          ceom: examen.tipo_examen.ceom,
          punteo_maximo: examen.punteo_maximo,
          series: [],
        };
      
        for (const serieExamen of seriesExamen) {

          const preguntasExamenMaster = await this.examenMasterRepository.find({
            where: { serie_examen: serieExamen},
            relations: ['pregunta'],
          });
      
          const serieData = {
            serie: serieExamen.serie.nombre,
            instrucciones: serieExamen.serie.instrucciones,
            preguntas: [],
          };
      
          for (const examenMaster of preguntasExamenMaster) {

            const preguntaRespuestas = await this.preguntaRespuestaRepository.find({
              where: { pregunta: examenMaster.pregunta},
              relations: ['respuesta'],
            });
      
            const preguntaData = {
              descripcion_pregunta: examenMaster.pregunta.descripcion,
              respuestas: preguntaRespuestas.map(pr => ({
                descripcion_respuesta: pr.respuesta.respuesta,
                esCorrecta: pr.respuesta.esCorrecta,
              })),
            };
      
            serieData.preguntas.push(preguntaData);
          }
      
          result.series.push(serieData);
        }
      
        return result;
      }
      
      

}
