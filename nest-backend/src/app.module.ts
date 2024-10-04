import { Module } from '@nestjs/common';
import { SeedDbModule } from './seed-db/seed-db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {BancoRespuestasModule} from './banco_respuestas/banco_respuestas.module'
import {PreguntaModule} from './pregunta/pregunta.module'
import {EmpleoModule} from './empleo/empleo.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'Jucemart55',
      database: 'laboratorio_evaluados_web',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false
    }),
    SeedDbModule,BancoRespuestasModule, PreguntaModule, EmpleoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
