import { IsString, MinLength, IsOptional, IsBoolean } from "class-validator";

export class UpdatePreguntaDto {

    @IsBoolean()
    @IsOptional()
    readonly estado?: boolean;

    @IsString()
    @IsOptional()
    @MinLength(5, { message: "El enunciado debe tener mínimo 5 caracteres" })
    readonly enunciado?: string;

    @IsString()
    @IsOptional()
    @MinLength(4, { message: "El usuario modificador debe tener mínimo 4 caracteres" })
    readonly usuario_modifica?: string;
}
