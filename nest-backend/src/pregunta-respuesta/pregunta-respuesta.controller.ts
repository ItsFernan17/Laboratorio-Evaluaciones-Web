import { Controller, Get, Post, Put, Patch, Body, Param } from '@nestjs/common';
import { PreguntaRespuestaService } from './pregunta-respuesta.service';
import { CreatePreguntaRespuestaDto, UpdatePreguntaRespuestaDto } from './dto';
import { CreatePreguntaDto } from 'src/pregunta/dto';
import { CreateRespuestaDto } from 'src/respuesta/dto';

@Controller('pregunta-respuesta')
export class PreguntaRespuestaController {
  constructor(private readonly preguntaRespuestaService: PreguntaRespuestaService) {}

  @Get()
  findAll() {
    return this.preguntaRespuestaService.findAll();
  }

  @Get('preguntas-con-respuestas')
  findAllPreguntasConRespuestas() {
    return this.preguntaRespuestaService.findPreguntasRespuestas();
  }


  @Get(':codigo_pre_res')
  findById(@Param('codigo_pre_res') codigo_pre_res: number) {
    return this.preguntaRespuestaService.findById(codigo_pre_res);
  }

  @Post()
  createPreguntaRespuesta(@Body() createPreguntaRespuestaDto: CreatePreguntaRespuestaDto) {
    return this.preguntaRespuestaService.createPreguntaRespuesta(createPreguntaRespuestaDto);
  }

  @Post('registrar-preguntas-con-respuestas')
  async registerPreguntaConRespuestas(@Body() body: any) {
    const preguntasConRespuestas = Array.isArray(body) ? body : [body];

    const formattedPreguntasConRespuestas = preguntasConRespuestas.map((item: any) => {
        const createPreguntaDto: CreatePreguntaDto = {
            usuario_ingreso: item.usuario_ingreso,
            descripcion: item.descripcion,
            punteo: item.punteo,
            tipo_pregunta: item.tipo_pregunta,
        };

        const createRespuestasDto: CreateRespuestaDto[] = item.respuestas.map((respuesta: any) => ({
            respuesta: respuesta.respuesta,
            esCorrecta: respuesta.esCorrecta,
            usuario_ingreso: respuesta.usuario_ingreso,
        }));

        return { pregunta: createPreguntaDto, respuestas: createRespuestasDto };
    });

    return this.preguntaRespuestaService.registerPreguntasConRespuestas(formattedPreguntasConRespuestas);
  }

  @Put(':codigo_pre_res')
  updatePreguntaRespuesta(@Param('codigo_pre_res') codigo_pre_res: number, @Body() updatePreguntaRespuestaDto: UpdatePreguntaRespuestaDto) {
    return this.preguntaRespuestaService.updatePreguntaRespuesta(codigo_pre_res, updatePreguntaRespuestaDto);
  }

  @Patch(':codigo_pre_res/estado')
  deletePreguntaRespuesta(@Param('codigo_pre_res') codigo_pre_res: number) {
    return this.preguntaRespuestaService.desactivePreguntaRespuesta(codigo_pre_res);
  }

}
