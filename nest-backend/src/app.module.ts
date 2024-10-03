import { Module } from '@nestjs/common';
import { SeedDbModule } from './seed-db/seed-db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ExamenService } from './examen/examen.service';
import { ExamenController } from './examen/examen.controller';
import { ExamenModule } from './examen/examen.module';
import { DetalleExamenController } from './detalle-examen/detalle-examen.controller';
import { DetalleExamenService } from './detalle-examen/detalle-examen.service';
import { DetalleExamenModule } from './detalle-examen/detalle-examen.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    SeedDbModule,
    ExamenModule,
    DetalleExamenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
