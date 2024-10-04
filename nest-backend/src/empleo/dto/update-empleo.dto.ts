import { IsString, MinLength, IsOptional, IsBoolean } from "class-validator";

export class UpdateEmpleoDto {

    @IsBoolean()
    @IsOptional()
    readonly estado?: boolean;

    @IsString()
    @IsOptional()
    @MinLength(5, { message: "La descripción debe tener mínimo 5 caracteres" })
    readonly descripcion?: string;

    @IsString()
    @IsOptional()
    @MinLength(4, { message: "El usuario modificador debe tener mínimo 4 caracteres" })
    readonly usuario_modifica?: string;
}
