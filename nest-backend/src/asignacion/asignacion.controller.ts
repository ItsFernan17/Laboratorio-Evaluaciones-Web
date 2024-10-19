import { Controller, Get, Post, Put, Patch, Body, Param, NotFoundException } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { Asignacion } from './model/asignacion.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePunteoDto } from './dto/update-punteo.dto';

@Controller('asignacion')
export class AsignacionController {
  constructor(
    private readonly asignacionService: AsignacionService,
  ) {}

  @Get()
  getAsignaciones(): Promise<Asignacion[]> {
    return this.asignacionService.findAll();
  }

  @Get(':codigo_asignacion')
  async getAsignacionById(@Param('codigo_asignacion') codigo_asignacion: number): Promise<Asignacion> {
    const asignacion = await this.asignacionService.findById(codigo_asignacion);
    if (asignacion instanceof HttpException) {
      throw asignacion; // Lanza la excepción si existe
    }
    return asignacion; // Devuelve la asignación si se encuentra
  }

  @Post()
  createAsignacion(@Body() newAsignacion: CreateAsignacionDto): Promise<Asignacion> {
    return this.asignacionService.createAsignacion(newAsignacion);
  }

  @Put(':codigo_asignacion')
  async updateAsignacion(
    @Param('codigo_asignacion') codigo_asignacion: number,
    @Body() updateAsignacion: UpdateAsignacionDto,
  ): Promise<Asignacion> {
    const asignacion = await this.asignacionService.updateAsignacion(codigo_asignacion, updateAsignacion);
    if (asignacion instanceof HttpException) {
      throw asignacion; // Lanza la excepción si existe
    }
    return asignacion; // Devuelve la asignación actualizada si se encuentra
  }

  @Patch(':codigo_asignacion/estado')
  async desactiveAsignacion(@Param('codigo_asignacion') codigo_asignacion: number): Promise<Asignacion> {
    const asignacion = await this.asignacionService.desactiveAsignacion(codigo_asignacion);
    if (asignacion instanceof HttpException) {
      throw asignacion; // Lanza la excepción si existe
    }
    return asignacion; // Devuelve la asignación desactivada
  }

  @Get(':codigo_asignacion/datos')
  async getAsignacionConDatos(@Param('codigo_asignacion') codigo_asignacion: number) {
      const asignacion = await this.asignacionService.getAsignacionConDatos(codigo_asignacion);
      return asignacion; // Devuelve la asignación con datos filtrados
  }
  
  @Put(':codigo_asignacion/punteo')
  async updatePunteo(
    @Param('codigo_asignacion') codigo_asignacion: number,
    @Body() updatePunteoDto: UpdatePunteoDto,
  ) {
    return this.asignacionService.updatePunteo(codigo_asignacion, updatePunteoDto.punteo);
  }


}
