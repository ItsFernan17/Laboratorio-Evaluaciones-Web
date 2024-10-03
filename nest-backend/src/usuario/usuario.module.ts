import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from './model/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]), // Asegúrate de que esto esté presente
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService], // Exporta si necesitas usarlo en otros módulos
})
export class UsuarioModule {}
