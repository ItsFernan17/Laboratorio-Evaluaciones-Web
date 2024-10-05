import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateComandoDto {

    @IsString()
    @IsOptional()
    @MinLength(5, { message: "El comando debe tener mínimo 5 caracteres" })
    nombre_comando?: string;

    @IsString()
    @IsOptional()
    @MinLength(4, { message: "El usuario debe tener mínimo 4 caracteres" })
    usuario_modifica?: string;
}
