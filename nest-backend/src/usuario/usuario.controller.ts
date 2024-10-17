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

  @Put(':dpi')
  updateUsuario(@Param('dpi') dpi: string, @Body() updateUsuario: UpdateUsuarioDto) {
    return this.usuarioService.updateUsuario(dpi, updateUsuario);
  }

  @Patch(':id/estado')
  desactiveUsuario(@Param('id') dpi: string) {
    return this.usuarioService.desactiveUsuario(dpi);
  }

}
