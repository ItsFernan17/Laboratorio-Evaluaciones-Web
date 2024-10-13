import { Controller, Get, Post, Put, Patch, Body, Param } from '@nestjs/common';
import { TipoExamenService } from './tipo-examen.service';
import { CreateTipoExamenDto, UpdateTipoExamenDto } from './dto';

@Controller('tipo-examen')
export class TipoExamenController {
  constructor(
    private readonly tipoExamenService: TipoExamenService
  ) {}

  @Get()
  getTipoExamenes() {
    return this.tipoExamenService.findAll();
  }

  @Get(':codigo_tipoE')
  getTipoExamenById(@Param('codigo_tipoE') codigo_tipoE: number) {
    return this.tipoExamenService.findById(codigo_tipoE);
  }

  @Post()
  createTipoExamen(@Body() newTipoExamen: CreateTipoExamenDto) {
    return this.tipoExamenService.createTipoExamen(newTipoExamen);
  }

  @Put(':codigo_tipoE')
  updateTipoExamen(@Param('codigo_tipoE') codigo_tipoE: number, @Body() updateTipoExamen: UpdateTipoExamenDto) {
    return this.tipoExamenService.updateTipoExamen(codigo_tipoE, updateTipoExamen);
  }

  @Patch(':codigo_tipoE/estado')
  desactiveTipoExamen(@Param('codigo_tipoE') codigo_tipoE: number) {
    return this.tipoExamenService.desactiveTipoExamen(codigo_tipoE);
  }















}
