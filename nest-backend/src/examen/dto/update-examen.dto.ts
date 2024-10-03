import {IsInt, IsString, MinLength, Min, IsOptional, IsDateString } from "class-validator";

export class UpdateExamenDto{

    @IsDateString()
    @IsOptional()
    readonly fecha_evaluacion?: string;

    @IsString()
    @IsOptional()
    @MinLength(4, {message: "El usuario debe de tener mínimo 4 caracteres"})
    readonly usuario?: string;

    @IsString()
    @IsOptional()
    @MinLength(4, {message: "El empelo debe de tener mínimo 4 caracteres"})
    readonly empleo?: string;

    @IsInt({message: "El punteo total debe ser un número entero"})
    @IsOptional()
    @Min(0, {message: "El punteo total debe ser mayor o igual a 0"})
    readonly punteo_total?:number;

    @IsString()
    @IsOptional()
    @MinLength(4, {message: "El usuario debe de tener mínimo 4 caracteres"})
    readonly usuario_modifica: string
}