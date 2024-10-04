

import { Controller, Get, Post, Put, Patch, Body, Param } from '@nestjs/common';
import { BancoRespuestasService } from './banco_respuestas.service';
import { CreateBancoRespuestasDto} from './dto/create-banco_respuestas.dto';
import { UpdateBancoRespuestasDto } from './dto/update-banco_respuestas.dto';

@Controller('banco-respuestas')
export class BancoRespuestasController {
    constructor(
        private readonly bancoRespuestasService: BancoRespuestasService
    ) {}

    @Get()
    getBancoRespuestas() {
        return this.bancoRespuestasService.findAll();
    }

    @Get(':id')
    getBancoRespuestaId(@Param('id') codigo_respuesta: number) {
        return this.bancoRespuestasService.findById(codigo_respuesta);
    }

    @Post()
    createBancoRespuesta(@Body() newBancoRespuesta: CreateBancoRespuestasDto) {
        return this.bancoRespuestasService.createBancoRespuesta(newBancoRespuesta);
    }

    @Put(':id')
    updateBancoRespuesta(@Param('id') codigo_respuesta: number, @Body() updateBancoRespuesta: UpdateBancoRespuestasDto) {
        return this.bancoRespuestasService.updateBancoRespuesta(codigo_respuesta, updateBancoRespuesta);
    }

    @Patch(':id/estado')
    desactiveBancoRespuesta(@Param('id') codigo_respuesta: number) {
        return this.bancoRespuestasService.desactiveBancoRespuesta(codigo_respuesta);
    }
}
