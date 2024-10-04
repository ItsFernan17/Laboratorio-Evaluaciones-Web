import { IsNotEmpty, IsString, MaxLength, MinLength, IsInt, IsEnum, Length, IsBoolean } from "class-validator";


export class DeleteUsuarioDto {

    ESTADO?: boolean;

    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
    @MaxLength(30, { message: 'El nombre de usuario no debe exceder los 30 caracteres' })
    NOMBRE_USUARIO: string;
}

