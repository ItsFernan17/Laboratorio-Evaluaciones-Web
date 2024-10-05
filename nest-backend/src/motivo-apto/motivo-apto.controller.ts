import { Body, Controller, Get, Param, Post, Put, Patch } from '@nestjs/common';
import { MotivoAptoService } from './motivo-apto.service';
import { CreateMotivoAptoDto, UpdateMotivoAptoDto } from './dto';

@Controller('motivo-apto')
export class MotivoAptoController {
    constructor(
        private readonly motivoAptoService: MotivoAptoService
    ) {}

    @Get()
    getMotivo() {
      return this.motivoAptoService.findAll();
    }
  
    @Get(':id')
    getMotivoId(@Param('id') codigo_motivo: number) {
      return this.motivoAptoService.findById(codigo_motivo);
    }
  
    @Post()
    createMotivo(@Body() newMotivo: CreateMotivoAptoDto) {
      return this.motivoAptoService.createMotivo(newMotivo);
    }
  
    @Put(':id')
    updateMotivo(@Param('id') codigo_motivo: number, @Body() updateMotivoDto: UpdateMotivoAptoDto) {
      return this.motivoAptoService.updateMotivo(codigo_motivo, updateMotivoDto);
    }
  
    @Patch(':id/estado')
    desactiveMotivo(@Param('id') codigo_motivo: number) {
      return this.motivoAptoService.desactiveMotivo(codigo_motivo);
    }
    
}
