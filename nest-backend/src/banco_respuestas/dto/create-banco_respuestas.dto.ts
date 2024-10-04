import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateBancoRespuestasDto {

    @IsNotEmpty({ message: "El estado es obligatorio" })
    readonly estado: boolean;

    @IsString()
    @IsNotEmpty({ message: "La respuesta es obligatoria" })
    @MinLength(5, { message: "La respuesta debe tener mínimo 5 caracteres" })
    readonly respuesta: string;

    @IsString()
    @IsNotEmpty({ message: "El usuario de ingreso es obligatorio" })
    @MinLength(4, { message: "El usuario debe tener mínimo 4 caracteres" })
    readonly usuario_ingreso: string;
}
