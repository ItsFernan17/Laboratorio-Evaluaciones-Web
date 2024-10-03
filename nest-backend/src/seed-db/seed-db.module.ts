import { Module } from '@nestjs/common';
import { SeedDbController } from './seed-db.controller';
import { SeedDbService} from './seed-db.service';
import { DepartamentoModule } from './departamento/departamento.module';
import { GradoModule } from './grado/grado.module';
import { PoblacionModule } from './poblacion/poblacion.module';

@Module({
  controllers: [SeedDbController],
  imports: [DepartamentoModule, GradoModule, PoblacionModule],
  providers: [SeedDbService]
})
export class SeedDbModule {}
