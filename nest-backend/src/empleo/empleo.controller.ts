import { Controller, Get, Post, Put, Patch, Body, Param } from '@nestjs/common';
import { EmpleoService } from './empleo.service';  // Asegúrate de que la ruta sea correcta
import { CreateEmpleoDto } from './dto/create-empleo.dto';  // Asegúrate de que la ruta sea correcta
import { UpdateEmpleoDto } from './dto/update-empleo.dto';  // Asegúrate de que la ruta sea correcta

@Controller('empleo')
export class EmpleoController {
    constructor(
        private readonly empleoService: EmpleoService
    ) {}

    @Get()
    getEmpleos() {
        return this.empleoService.findAll();
    }

    @Get(':ceom')
    getEmpleoById(@Param('ceom') ceom: string) {
        return this.empleoService.findById(ceom);
    }

    @Post()
    createEmpleo(@Body() newEmpleo: CreateEmpleoDto) {
        return this.empleoService.createEmpleo(newEmpleo);
    }
    
    @Put(':ceom')
    updateEmpleo(@Param('ceom') ceom: string, @Body() updateEmpleo: UpdateEmpleoDto) {
        return this.empleoService.updateEmpleo(ceom, updateEmpleo);
    }
    

    @Patch(':ceom/estado')
    desactiveEmpleo(@Param('ceom') ceom: string) {
        return this.empleoService.desactiveEmpleo(ceom);
    }
}
