import { Module } from '@nestjs/common';
import { SeedDbController } from './seed-db.controller';
import { SeedDbService} from './seed-db.service';
import { DepartamentoModule } from './departamento/departamento.module';

@Module({
  controllers: [SeedDbController],
  imports: [DepartamentoModule],
  providers: [SeedDbService]
})
export class SeedDbModule {}
