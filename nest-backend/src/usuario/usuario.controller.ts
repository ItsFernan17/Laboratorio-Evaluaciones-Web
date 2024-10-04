import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }


  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':nombre_usuario')
  findOne(@Param('nommbre_usuario') nombre_usuario: string) {
    return this.usuarioService.findOne(nombre_usuario);
  }

  @Patch(':nombre_usuario')
  update(@Param('nombre_usuario') nombre_usuario: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(nombre_usuario, updateUsuarioDto);
  }


  @Delete(':nombre_usuario')
  remove(@Param('nombre_usuario') nombre_usuario: string) {
    return this.usuarioService.remove(nombre_usuario);
  }
}
