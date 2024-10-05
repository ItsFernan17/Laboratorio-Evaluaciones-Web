import {IsInt, IsString, MaxLength, Min, IsOptional, IsDateString } from "class-validator";

export class UpdateExamenDto{

    @IsDateString()
    @IsOptional()
    fecha_evaluacion?: string;

    @IsString()
    @IsOptional()
    @MaxLength(25, {message: "El usuario debe de tener máximo 4 caracteres"})
    usuario?: string;

    @IsString()
    @IsOptional()
    @MaxLength(10, {message: "El empleo debe de tener máximo 4 caracteres"})
    empleo?: string;

    @IsInt({message: "El punteo total debe ser un número entero"})
    @IsOptional()
    @Min(0, {message: "El punteo total debe ser mayor o igual a 0"})
    punteo_total?:number;

    @IsString()
    @IsOptional()
    @MaxLength(25, {message: "El usuario debe de tener mínimo 4 caracteres"})
    usuario_modifica: string
}