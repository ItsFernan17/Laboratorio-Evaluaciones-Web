import { Module } from '@nestjs/common';
import { MotivoNoaptoService } from './motivo-noapto.service';
import { MotivoNoaptoController } from './motivo-noapto.controller';
import { MotivoNoApto } from './model/motivo-noapto.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MotivoNoApto]),  UsuarioModule],
  providers: [MotivoNoaptoService],
  controllers: [MotivoNoaptoController],
  exports: [TypeOrmModule],
})
export class MotivoNoaptoModule {}
