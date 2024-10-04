import { IsNotEmpty, IsString, MaxLength, MinLength, IsInt, IsEnum} from "class-validator";

enum Roles {
    admin = 'admin',
    evaluador = 'evaluador',
    auxiliar = 'auxiliar',
    evaluado = 'evaluado'
}

export class CreateUsuarioDto {

    @MinLength(12, { message: 'El DPI debe tener al menos 12 caracteres' })
    @MaxLength(15, { message: 'El DPI no debe exceder los 15 caracteres' })
    @IsNotEmpty({ message: 'El DPI es obligatorio' })
    @IsString({ message: 'El DPI debe ser una cadena de texto' })
    dpi: string;

    @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
    @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
    @MaxLength(75, { message: 'El nombre completo no debe exceder los 75 caracteres' })
    nombre_completo: string;

    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    @MinLength(8, { message: 'El teléfono debe tener al menos 8 caracteres' })
    @MaxLength(15, { message: 'El teléfono no debe exceder los 15 caracteres' })
    telefono: string;

    nombre_usuario: string;

    @IsNotEmpty({ message: 'El rol es obligatorio' })
    @IsEnum(Roles, { message: 'El rol debe ser uno de los valores permitidos: admin, evaluador, auxiliar, evaluado' })
    rol: Roles;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MaxLength(100, { message: 'La contraseña no debe exceder los 100 caracteres' })
    contrasenia: string;

    @IsNotEmpty({ message: 'El grado es obligatorio' })
    @IsInt()
    grado: number;

    @IsNotEmpty({ message: 'La población es obligatoria' })
    @IsInt()
    poblacion: number;

    @IsNotEmpty({ message: 'La recidencia es obligatoria' })
    @IsInt()
    residencia: number;


}