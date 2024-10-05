import { IsString, MinLength, IsOptional, IsInt } from "class-validator";

export class UpdatePreguntaDto {

    @IsString()
    @IsOptional()
    @MinLength(5, { message: "El enunciado debe tener mínimo 5 caracteres" })
    enunciado?: string;

    @IsInt({ message: "El banco de respuestas debe ser un número entero" })
    @IsOptional()
    banco_respuestas?: number;

    @IsString()
    @IsOptional()
    @MinLength(4, { message: "El usuario modificador debe tener mínimo 4 caracteres" })
    usuario_modifica?: string;
}
