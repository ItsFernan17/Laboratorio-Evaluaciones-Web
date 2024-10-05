import { Module } from '@nestjs/common';
import { SeedDbModule } from './seed-db/seed-db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ExamenModule } from './examen/examen.module';
import { DetalleExamenModule } from './detalle-examen/detalle-examen.module';
import { EmpleoModule } from './empleo/empleo.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { BancoRespuestasModule } from './banco_respuestas/banco_respuestas.module';
import { UsuarioModule } from './usuario/usuario.module';

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
      synchronize: true,
      dropSchema: true,
    }),
    SeedDbModule,
    ExamenModule,
    DetalleExamenModule,
    EmpleoModule,
    PreguntaModule,
    BancoRespuestasModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
