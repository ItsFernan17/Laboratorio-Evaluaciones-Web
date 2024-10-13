import { IsArray, IsDateString, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateExamenDto {
    @IsDateString()
    fecha_evaluacion: string;

    @IsNumber()
    tipo_examen: number;

    @IsNumber()
    punteo_maximo: number;

    @IsString()
    usuario_ingreso: string;
}

class PreguntaDto {
    @IsNumber()
    preguntaid: number;
}

class CreateSerieDto {
    @IsNumber()
    serieID: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PreguntaDto)
    preguntas: PreguntaDto[];
}

class CreateSerieExamenDto {
    @ValidateNested()
    @Type(() => CreateSerieDto)
    serie: CreateSerieDto;
}

export class CreateExamenCompletoDto {
    @ValidateNested()
    @Type(() => CreateExamenDto)
    examen: CreateExamenDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSerieExamenDto)
    serieExamen: CreateSerieExamenDto[];
}