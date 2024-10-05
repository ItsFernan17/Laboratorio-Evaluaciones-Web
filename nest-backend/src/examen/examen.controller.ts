import { Controller, Get, Post, Put, Patch, Body, Param } from '@nestjs/common';
import { ExamenService } from './examen.service';
import { CreateExamenDto, UpdateExamenDto } from './dto';

@Controller('examen')
export class ExamenController {

    constructor(
        private readonly examenService: ExamenService
    ){}

    @Get()
    getExamenes(){
        return this.examenService.findAll();
    }

    @Get(':id')
    getExamenesId(@Param('id') codigo_examen: number){
        return this.examenService.findById(codigo_examen);
    }

    @Post()
    createExamen(@Body() newExamen: CreateExamenDto){
        return this.examenService.createExamen(newExamen);
    }

    @Put(':id')
    updateExamen(@Param(':id') codigo_examen: number, @Body() updateExamen: UpdateExamenDto){
       return this.examenService.updateExamen(codigo_examen, updateExamen);
    }

    @Patch(':id/estado')
    desactiveExamen(@Param('id') codigo_examen: number){
        return this.examenService.desactiveExamen(codigo_examen);
    }
}
