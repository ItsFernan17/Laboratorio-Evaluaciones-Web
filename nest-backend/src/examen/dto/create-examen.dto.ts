import { IsNotEmpty, IsInt, IsString, MaxLength, Min, IsDateString } from "class-validator";

export class CreateExamenDto{

    @IsDateString()
    @IsNotEmpty({message: "Este campo es obligatorio"})
    fecha_evaluacion: string;

    @IsString()
    @IsNotEmpty({message: "Este campo es obligatorio"})
    @MaxLength(25, {message: "El usuario debe de tener máximo 4 caracteres"})
    usuario: string;

    @IsString()
    @IsNotEmpty({message: "Este campo es obligatorio"})
    @MaxLength(10, {message: "El empleo debe de tener máximo 4 caracteres"})
    empleo: string;

    @IsInt({message: "El punteo total debe ser un número entero"})
    @IsNotEmpty({message: "Este campo es obligatorio"})
    @Min(0, {message: "El punteo total debe ser mayor o igual a 0"})
    punteo_total:number;

    @IsString()
    @IsNotEmpty({message: "Este campo es obligatorio"})
    @MaxLength(25, {message: "El usuario debe de tener mínimo 4 caracteres"})
    usuario_ingreso: string

}