import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { CertificacionModule } from './certificacion/certificacion.module';
import { SeedDbModule } from './seed-db/seed-db.module';

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
      synchronize: true, // Cambia a true en desarrollo si es necesario
    }),
    SeedDbModule,
    UsuarioModule,
    CertificacionModule,
  ],
})
export class AppModule { }
