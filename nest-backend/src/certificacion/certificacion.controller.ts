import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificacionService } from './certificacion.service';
import { CreateCertificacionDto } from './dto/create-certificacion.dto';
import { UpdateCertificacionDto } from './dto/update-certificacion.dto';

@Controller('certificacion')
export class CertificacionController {
  constructor(private readonly certificacionService: CertificacionService) {}

  @Post()
  create(@Body() createCertificacionDto: CreateCertificacionDto) {
    return this.certificacionService.create(createCertificacionDto);
  }

  @Get()
  findAll() {
    return this.certificacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCertificacionDto: UpdateCertificacionDto) {
    return this.certificacionService.update(+id, updateCertificacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificacionService.remove(+id);
  }
}
