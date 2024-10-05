import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ComandoService } from './comando.service';
import { CreateComandoDto, UpdateComandoDto } from './dto';

@Controller('comando')
export class ComandoController {
    constructor(
        private readonly comandoService: ComandoService
    ) {}
    @Get()
    getEmpleos() {
        return this.comandoService.findAll();
    }

    @Get(':id')
    getComandoById(@Param('id') codigo_comando: number) {
        return this.comandoService.findById(codigo_comando);
    }

    @Post()
    createComando(@Body() newComando: CreateComandoDto) {
        return this.comandoService.createComando(newComando);
    }
    
    @Put(':id')
    updateComando(@Param('id') codigo_comando: number, @Body() updateComando: UpdateComandoDto) {
        return this.comandoService.updateComando(codigo_comando, updateComando);
    }
    

    @Patch(':id/estado')
    desactiveEmpleo(@Param('id') codigo_comando: number) {
        return this.comandoService.desactiveComando(codigo_comando);
    }
}
