import { IsNotEmpty, IsInt, IsString, MinLength, Min, IsBoolean, MaxLength } from "class-validator";

export class CreateDetalleDto{

    @IsInt()
    @IsNotEmpty({message: "Este campo es obligatorio"})
    readonly examen: number;

    @IsInt()
    @IsNotEmpty({message: "Este campo es obligatorio"})
    readonly pregunta: number;

    @IsString()
    @IsNotEmpty({message: "Este campo es obligatorio"})
    @MinLength(10, {message: "La respuesta debe de tener mínimo 10 caracteres"})
    @MaxLength(150, {message: "La respuesta dada debe de tener máximo 150 caracteres"})
    readonly respuesta_dada: string;

    @IsString()
    @IsNotEmpty({message: "Este campo es obligatorio"})
    @MinLength(4, {message: "El usuario debe de tener mínimo 4 caracteres"})
    readonly usuario_ingreso: string

}