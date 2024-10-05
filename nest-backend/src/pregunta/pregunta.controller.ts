import { Controller, Get, Post, Put, Patch, Body, Param } from '@nestjs/common';
import { PreguntaService } from './pregunta.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';

@Controller('pregunta')
export class PreguntaController {
    constructor(
        private readonly preguntaService: PreguntaService
    ) {}

    @Get()
    getPreguntas() {
        return this.preguntaService.findAll();
    }

    @Get(':id')
    getPreguntaId(@Param('id') codigo_pregunta: number) {
        return this.preguntaService.findById(codigo_pregunta);
    }

    @Post()
    createPregunta(@Body() newPregunta: CreatePreguntaDto) {
        return this.preguntaService.createPregunta(newPregunta);
    }

    @Put(':id')
    updatePregunta(@Param('id') codigo_pregunta: number, @Body() updatePregunta: UpdatePreguntaDto) {
        return this.preguntaService.updatePregunta(codigo_pregunta, updatePregunta);
    }

    @Patch(':id/estado')
    desactivePregunta(@Param('id') codigo_pregunta: number) {
        return this.preguntaService.desactivePregunta(codigo_pregunta);
    }
}
