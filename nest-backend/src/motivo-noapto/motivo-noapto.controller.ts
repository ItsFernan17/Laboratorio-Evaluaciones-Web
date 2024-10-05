import { Body, Controller, Get, Param, Post, Put, Patch } from '@nestjs/common';
import { MotivoNoaptoService } from './motivo-noapto.service';
import { CreateMotivoNoAptoDto, UpdateMotivoNoAptoDto } from './dto';


@Controller('motivo-noapto')
export class MotivoNoaptoController {
    constructor(
        private readonly motivoNoaptoService: MotivoNoaptoService
    ) {}

    @Get()
    getMotivo() {
      return this.motivoNoaptoService.findAll();
    }
  
    @Get(':id')
    getMotivoId(@Param('id') codigo_motivo: number) {
      return this.motivoNoaptoService.findById(codigo_motivo);
    }
  
    @Post()
    createMotivo(@Body() newMotivo: CreateMotivoNoAptoDto) {
      return this.motivoNoaptoService.createNoMotivo(newMotivo);
    }
  
    @Put(':id')
    updateMotivo(@Param('id') codigo_motivo: number, @Body() updateMotivoDto: UpdateMotivoNoAptoDto) {
      return this.motivoNoaptoService.updateNoMotivo(codigo_motivo, updateMotivoDto);
    }
  
    @Patch(':id/estado')
    desactiveMotivo(@Param('id') codigo_motivo: number) {
      return this.motivoNoaptoService.desactiveNoMotivo(codigo_motivo);
    }
}
