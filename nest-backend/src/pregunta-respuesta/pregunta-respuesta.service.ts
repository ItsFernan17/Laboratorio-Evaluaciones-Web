import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PreguntaRespuesta } from './model/pregunta-respuesta.entity';
import { CreatePreguntaRespuestaDto, UpdatePreguntaRespuestaDto } from './dto';
import { Usuario } from 'src/usuario/model/usuario.entity';
import { Pregunta } from 'src/pregunta/model/pregunta.entity';
import { Respuesta } from 'src/respuesta/model/respuesta.entity';
import { PreguntaService } from 'src/pregunta/pregunta.service';
import { RespuestaService } from 'src/respuesta/respuesta.service';
import { CreatePreguntaDto } from 'src/pregunta/dto';
import { CreateRespuestaDto } from 'src/respuesta/dto';

@Injectable()
export class PreguntaRespuestaService {

    constructor(
        @InjectRepository(PreguntaRespuesta)
        private preguntaRespuestaRepository: Repository<PreguntaRespuesta>,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        @InjectRepository(Pregunta)
        private preguntaRepository: Repository<Pregunta>,
        @InjectRepository(Respuesta)
        private respuestaRepository: Repository<Respuesta>,
        private readonly preguntaService: PreguntaService,
        private readonly respuestaService: RespuestaService,
    ){}

    async findAll(){
        return this.preguntaRespuestaRepository.find({
            where: { estado: true },
        });
    }

    async findById(codigo_pre_res: number){
        const preguntaRespuestaExistente = await this.preguntaRespuestaRepository.findOne({
            where: { codigo_pre_res, estado: true },
        });

        if (!preguntaRespuestaExistente) {
            return new HttpException(
                'La pregunta-respuesta con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        return preguntaRespuestaExistente;
    }

    async createPreguntaRespuesta(createPreguntaRespuestaDto: CreatePreguntaRespuestaDto){

        const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: createPreguntaRespuestaDto.usuario_ingreso} });
        const pregunta = await this.preguntaRepository.findOne({ where: { codigo_pregunta: createPreguntaRespuestaDto.pregunta} });
        const respuesta = await this.respuestaRepository.findOne({ where: { codigo_respuesta: createPreguntaRespuestaDto.respuesta} });

        if (!usuario) {
            throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }

        if (!pregunta) {
            throw new HttpException('Pregunta no encontrada.', HttpStatus.NOT_FOUND);
        }

        if (!respuesta) {
            throw new HttpException('Respuesta no encontrada.', HttpStatus.NOT_FOUND);
        }

        const newPreguntaRespuesta = this.preguntaRespuestaRepository.create({
            pregunta: pregunta,
            respuesta: respuesta,
            estado: true,
            usuario_ingreso: usuario,
            fecha_ingreso: new Date(),
            fecha_modifica: null,
        });

        return this.preguntaRespuestaRepository.save(newPreguntaRespuesta);
    }

    async updatePreguntaRespuesta(codigo_pre_res: number, updatePreguntaRespuestaDto: UpdatePreguntaRespuestaDto){
        const preguntaRespuestaExistente = await this.preguntaRespuestaRepository.findOne({
            where: { codigo_pre_res },
        });

        if (!preguntaRespuestaExistente) {
            return new HttpException(
                'La pregunta-respuesta con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        const usuario = await this.usuarioRepository.findOne({ where: { nombre_usuario: updatePreguntaRespuestaDto.usuario_modifica} });
        const pregunta = await this.preguntaRepository.findOne({ where: { codigo_pregunta: updatePreguntaRespuestaDto.pregunta} });
        const respuesta = await this.respuestaRepository.findOne({ where: { codigo_respuesta: updatePreguntaRespuestaDto.respuesta} });

        if (!usuario) {
            throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
        }

        if (!pregunta) {
            throw new HttpException('Pregunta no encontrada.', HttpStatus.NOT_FOUND);
        }

        if (!respuesta) {
            throw new HttpException('Respuesta no encontrada.', HttpStatus.NOT_FOUND);
        }

        preguntaRespuestaExistente.pregunta = pregunta;
        preguntaRespuestaExistente.respuesta = respuesta;
        preguntaRespuestaExistente.usuario_modifica = usuario;      
        preguntaRespuestaExistente.fecha_modifica = new Date();

        return this.preguntaRespuestaRepository.save(preguntaRespuestaExistente);
    }

    async desactivePreguntaRespuesta(codigo_pre_res: number){
        const preguntaRespuestaExistente = await this.preguntaRespuestaRepository.findOne({
            where: { codigo_pre_res },
        });

        if (!preguntaRespuestaExistente) {
            return new HttpException(
                'La pregunta-respuesta con el código proporcionado no existe en la base de datos.',
                HttpStatus.NOT_FOUND,
            );
        }

        preguntaRespuestaExistente.estado = false;

        return this.preguntaRespuestaRepository.save(preguntaRespuestaExistente);
    }


    async registerPreguntasConRespuestas(preguntasConRespuestas: { pregunta: CreatePreguntaDto, respuestas: CreateRespuestaDto[] }[]): Promise<Pregunta[]> {
        //Con este método se registran multiples preguntas con sus respectivas respuestas
        const preguntas: Pregunta[] = [];
    
        for (const item of preguntasConRespuestas) {
            const { pregunta, respuestas } = item;
    
            // Verifica si la pregunta ya existe por su contenido
            let createdPregunta = await this.preguntaService.findByPregunta(pregunta.descripcion);
            if (createdPregunta) {
                // Lanza un error HTTP si la pregunta ya existe
                throw new HttpException(`La pregunta "${pregunta.descripcion}" ya existe.`, HttpStatus.BAD_REQUEST);
            }
    
            // Crea la pregunta si no existe
            createdPregunta = await this.preguntaService.createPregunta(pregunta);
    
            // Crea las respuestas y las asocia a la pregunta
            for (const createRespuestaDto of respuestas) {
                // Verifica si la respuesta ya existe por su contenido
                let respuesta = await this.respuestaService.findByRespuesta(createRespuestaDto.respuesta);
    
                if (!respuesta) {
                    // Crea la respuesta si no existe
                    respuesta = await this.respuestaService.createRespuesta(createRespuestaDto);
                }
    
                // Verifica si la respuesta ya está asociada a la pregunta
                const existingAssociation = await this.preguntaRespuestaRepository.findOne({
                    where: {
                        pregunta: { codigo_pregunta: createdPregunta.codigo_pregunta },
                        respuesta: { codigo_respuesta: respuesta.codigo_respuesta },
                    },
                });
    
                if (!existingAssociation) {
                    // Asocia la respuesta a la pregunta
                    const createPreguntaRespuestaDto: CreatePreguntaRespuestaDto = {
                        pregunta: createdPregunta.codigo_pregunta,
                        respuesta: respuesta.codigo_respuesta,
                        usuario_ingreso: pregunta.usuario_ingreso,
                    };
                    await this.createPreguntaRespuesta(createPreguntaRespuestaDto);
                }
            }
    
            preguntas.push(createdPregunta);
        }
    
        return preguntas;
    }

    async findPreguntasRespuestas() {
        const preguntas = await this.preguntaRespuestaRepository.find({
            where: { estado: true },
            relations: ['pregunta', 'respuesta'],
        });
    
        // Agrupar respuestas por pregunta
        const preguntasMap = new Map();
    
        preguntas.forEach(pr => {
            const preguntaId = pr.pregunta.codigo_pregunta;
            if (!preguntasMap.has(preguntaId)) {
                preguntasMap.set(preguntaId, {
                    descripcion: pr.pregunta.descripcion,
                    punteo: pr.pregunta.punteo,
                    respuestas: []
                });
            }
            preguntasMap.get(preguntaId).respuestas.push({
                respuesta: pr.respuesta.respuesta,
                esCorrecta: pr.respuesta.esCorrecta ? 'Correcta' : 'Incorrecta'
            });
        });
    
        // Convertir el mapa a un array
        const result = Array.from(preguntasMap.values());
    
        return result;
    }

}
