import { Controller, Get, Post, Put, Patch, Body, Param} from '@nestjs/common';
import { ExamenMasterService } from './examen-master.service';
import { CreateExamenMasterDto, UpdateExamenMasterDto } from './dto';
import { ExamenMasterDto } from './dto/create-examen.dto';

@Controller('examen-master')
export class ExamenMasterController {
  constructor(private readonly examenMasterService: ExamenMasterService) {}

  @Get()
  findAll() {
    return this.examenMasterService.findAll();
  }

  @Get(':codigo_master')
  findById(@Param('codigo_master') codigo_master: number) {
    return this.examenMasterService.findById(codigo_master);
  }

  @Get('informacion/:codigo_examen')
  findAllExamen(@Param('codigo_examen') codigo_examen: number) {
    return this.examenMasterService.getExamenDetail(codigo_examen);
  }

  @Post()
  createExamenMaster(@Body() createExamenMasterDto: CreateExamenMasterDto) {
    return this.examenMasterService.createExamenMaster(createExamenMasterDto);
  }

  @Post('crear-examen')
  async createExamen(@Body() createExamenDto: ExamenMasterDto) {
      return await this.examenMasterService.createExamen(createExamenDto);

  }


  @Put(':codigo_master')
  updateExamenMaster(@Param('codigo_master') codigo_master: number, @Body() updateExamenMasterDto: UpdateExamenMasterDto) {
    return this.examenMasterService.updateExamenMaster(codigo_master, updateExamenMasterDto);
  }


  @Patch(':codigo_master/estado')
  deletePreguntaRespuesta(@Param('codigo_master') codigo_master: number) {
    return this.examenMasterService.desactiveExamenMaster(codigo_master);
  }

}
