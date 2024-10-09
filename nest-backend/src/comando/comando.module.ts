import { Module } from '@nestjs/common';
import { ComandoService } from './comando.service';
import { ComandoController } from './comando.controller';
import { Comando } from './model/comando.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comando]),  UsuarioModule],
  controllers: [ComandoController],
  providers: [ComandoService],
  exports: [TypeOrmModule],
})
export class ComandoModule {}
