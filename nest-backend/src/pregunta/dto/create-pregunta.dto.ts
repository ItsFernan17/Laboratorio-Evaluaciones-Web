import { IsNotEmpty, IsString, MinLength, IsInt } from "class-validator";

export class CreatePreguntaDto {

    @IsString()
    @IsNotEmpty({ message: "El enunciado es obligatorio" })
    @MinLength(5, { message: "El enunciado debe tener mínimo 5 caracteres" })
    enunciado: string;

    @IsInt({ message: "El banco de respuestas debe ser un número entero" })
    @IsNotEmpty({ message: "El banco de respuestas es obligatorio" })
    banco_respuestas: number;

    @IsString()
    @IsNotEmpty({ message: "El usuario de ingreso es obligatorio" })
    @MinLength(4, { message: "El usuario debe tener mínimo 4 caracteres" })
    usuario_ingreso: string;
}
