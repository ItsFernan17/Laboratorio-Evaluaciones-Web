import { Module } from '@nestjs/common';
import { SeedDbModule } from './seed-db/seed-db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmpleoModule } from './empleo/empleo.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { TipoPreguntaModule } from './seed-db/tipo-pregunta/tipo-pregunta.module';
import { TipoExamenModule } from './tipo-examen/tipo-examen.module';
import { SerieModule } from './serie/serie.module';
import { RespuestaModule } from './respuesta/respuesta.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { PreguntaRespuestaModule } from './pregunta-respuesta/pregunta-respuesta.module';
import { ExamenModule } from './examen/examen.module';
import { ExamenMasterModule } from './examen-master/examen-master.module';
import { SerieExamenModule } from './serie-examen/serie-examen.module';
import { AsignacionModule } from './asignacion/asignacion.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ 
      type: 'mysql',
      username: 'root',
      password: 'Jucemart55',
      database: 'laboratorio_evaluados_web',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      dropSchema: false, 
    }),
    SeedDbModule, 
    EmpleoModule,
    UsuarioModule,
    AuthModule,
    TipoPreguntaModule,
    TipoExamenModule,
    SerieModule,
    RespuestaModule,
    PreguntaModule,
    PreguntaRespuestaModule,
    ExamenModule,
    ExamenMasterModule,
    SerieExamenModule,
    AsignacionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
