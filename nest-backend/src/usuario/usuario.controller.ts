import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  getUsuarios() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  getUsuarioId(@Param('id') dpi: string) {
    return this.usuarioService.findByDPI(dpi);
  }

  @Post()
  createUsuario(@Body() newUsuario: CreateUsuarioDto) {
    return this.usuarioService.createUsuario(newUsuario);
  }

  @Put(':id')
  updateUsuario(@Param('id') nombre_usuario: string, @Body() updateUsuario: UpdateUsuarioDto) {
    return this.usuarioService.updateUsuario(nombre_usuario, updateUsuario);
  }

  @Patch(':id/estado')
  desactiveUsuario(@Param('id') nombre_usuario: string) {
    return this.usuarioService.desactiveUsuario(nombre_usuario);
  }

}
