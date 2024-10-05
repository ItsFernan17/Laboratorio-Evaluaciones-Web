import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateComandoDto {

    @IsString()
    @IsNotEmpty({ message: "La respuesta es obligatoria" })
    @MinLength(5, { message: "El comando debe tener mínimo 5 caracteres" })
    nombre_comando: string;

    @IsString()
    @IsNotEmpty({ message: "El usuario de ingreso es obligatorio" })
    @MinLength(4, { message: "El usuario debe tener mínimo 4 caracteres" })
    usuario_ingreso: string;
}
