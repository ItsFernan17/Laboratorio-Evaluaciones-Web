import { Module } from '@nestjs/common';
import { MotivoEvaluacion } from './model/motivo-apto.entity';
import { MotivoAptoController } from './motivo-apto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotivoAptoService } from './motivo-apto.service';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
    imports: [TypeOrmModule.forFeature([MotivoEvaluacion]),  UsuarioModule],
    controllers: [MotivoAptoController],
    providers: [MotivoAptoService],
    exports: [TypeOrmModule],
  })
export class MotivoApoModule {}
