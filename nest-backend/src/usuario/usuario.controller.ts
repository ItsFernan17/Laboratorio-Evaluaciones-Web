import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
    getUsuario(){
        return this.usuarioService.findAll();
    }

    @Get(':id')
    getUsuarioName(@Param('id') nombre_usuario: string){
        return this.usuarioService.findByName(nombre_usuario);
    }

    @Post()
    createUsuario(@Body() newUsuario: CreateUsuarioDto){
        return this.usuarioService.createUsuario(newUsuario);
    }

    @Put(':id')
    updateUsuario(@Param('id') nombre_usuario: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
        return this.usuarioService.updateUsuario(nombre_usuario, updateUsuarioDto);
    }

    @Patch(':id/estado')
    desactiveUsuario(@Param('id') nombre_usuario: string){
        return this.usuarioService.desactiveUsuario(nombre_usuario);
    }

}
