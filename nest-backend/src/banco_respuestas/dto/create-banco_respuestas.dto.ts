import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Usuario } from "src/usuario/model/usuario.entity";

export class CreateBancoRespuestasDto {

    @IsString()
    @IsNotEmpty({ message: "La respuesta es obligatoria" })
    @MinLength(5, { message: "La respuesta debe tener mínimo 5 caracteres" })
    respuesta: string;

    @IsString()
    @IsNotEmpty({ message: "El usuario de ingreso es obligatorio" })
    @MinLength(4, { message: "El usuario debe tener mínimo 4 caracteres" })
    usuario_ingreso: string;
}
