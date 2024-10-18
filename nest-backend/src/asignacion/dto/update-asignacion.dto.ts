import { IsOptional, IsString } from "class-validator";

export class UpdateAsignacionDto {
    @IsString()
    @IsOptional()
    evaluado?: string;

    @IsString()
    @IsOptional()
    usuario_modifica?: string;
}
