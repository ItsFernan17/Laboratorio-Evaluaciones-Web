import { Controller, Get, Post, Put, Patch, Body, Param } from '@nestjs/common';
import { DetalleExamenService } from './detalle-examen.service';
import { CreateDetalleDto, UpdateDetalleDto } from './dto';


@Controller('detalle-examen')
export class DetalleExamenController {
    constructor(
        private readonly detalleService: DetalleExamenService
    ){}

    @Get()
    getDetallle(){
        return this.detalleService.findAll();
    }

    @Get(':id')
    getDetallleId(@Param('id') codigo_detalle: number){
        return this.detalleService.findById(codigo_detalle);
    }

    @Post()
    createDetallle(@Body() newDetalle: CreateDetalleDto){
        return this.detalleService.createDetalle(newDetalle);
    }

    @Put(':id')
    updateDetallle(@Param('id') codigo_detalle: number, @Body() updateDetalle: UpdateDetalleDto){
        return this.detalleService.updateDetalle(codigo_detalle, updateDetalle);
    }

    @Patch(':id/estado')
    desactiveDetallle(@Param('id') codigo_detalle: number){
        return this.detalleService.desactiveDetalle(codigo_detalle);
    } 

}
