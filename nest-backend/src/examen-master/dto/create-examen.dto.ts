import { IsNumber, IsDate, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ExamenMasterDto {
  @IsNumber()
  tipo_examen: number;    // Relación con Tipo de Examen

  @IsDate()
  @Type(() => Date)
  fecha_evaluacion: Date;

  @IsNumber()
  punteo_maximo: number;

  @IsBoolean()
  estado: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SerieIdDto)
  series: SerieIdDto[];

  constructor(tipoExamenId: number, fechaEvaluacion: Date, punteoMaximo: number, estado: boolean, series: SerieIdDto[]) {
    this.tipo_examen = tipoExamenId;
    this.fecha_evaluacion = fechaEvaluacion;
    this.punteo_maximo = punteoMaximo;
    this.estado = estado;
    this.series = series;
  }
}

// Serie ID DTO
export class SerieIdDto {
  @IsNumber()
  serie: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PreguntaIdDto)
  preguntas: PreguntaIdDto[];

  constructor(serieId: number, preguntas: PreguntaIdDto[]) {
    this.serie = serieId;
    this.preguntas = preguntas;
  }
}

// Pregunta ID DTO
export class PreguntaIdDto {
  @IsNumber()
  pregunta: number;

  constructor(preguntaId: number) {
    this.pregunta = preguntaId;
  }
}