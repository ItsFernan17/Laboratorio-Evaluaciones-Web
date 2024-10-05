import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleo } from './model/empleo.entity';
import { EmpleoController } from './empleo.controller'; 
import { EmpleoService } from './empleo.service'; 
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Empleo]),  UsuarioModule],
  controllers: [EmpleoController],
  providers: [EmpleoService,],
  exports: [EmpleoService, TypeOrmModule],
})
export class EmpleoModule {}
