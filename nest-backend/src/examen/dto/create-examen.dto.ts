import { IsNotEmpty, IsInt, IsString, MinLength, Min, IsDateString } from "class-validator";

export class CreateExamenDto{

    @IsDateString()
    @IsNotEmpty({message: "Este campo es obligatorio"})
    readonly fecha_evaluacion: string;

    @IsString()
    @IsNotEmpty({message: "Este campo es obligatorio"})
    @MinLength(4, {message: "El usuario debe de tener mínimo 4 caracteres"})
    readonly usuario: string;

    @IsString()
    @IsNotEmpty({message: "Este campo es obligatorio"})
    @MinLength(4, {message: "El empleo debe de tener mínimo 4 caracteres"})
    readonly empleo: string;

    @IsInt({message: "El punteo total debe ser un número entero"})
    @IsNotEmpty({message: "Este campo es obligatorio"})
    @Min(0, {message: "El punteo total debe ser mayor o igual a 0"})
    readonly punteo_total:number;

    @IsString()
    @IsNotEmpty({message: "Este campo es obligatorio"})
    @MinLength(4, {message: "El usuario debe de tener mínimo 4 caracteres"})
    readonly usuario_ingreso: string

}