import { IsOptional, IsString, MaxLength, MinLength, IsInt, IsEnum, IsBoolean } from 'class-validator';

enum Roles {
    admin = 'admin',
    evaluador = 'evaluador',
    auxiliar = 'auxiliar',
    evaluado = 'evaluado'
}

export class UpdateUsuarioDto {
    @IsOptional()
    @MinLength(12, { message: 'El DPI debe tener al menos 12 caracteres' })
    @MaxLength(15, { message: 'El DPI no debe exceder los 15 caracteres' })
    @IsString({ message: 'El DPI debe ser una cadena de texto' })
    dpi?: string;

    @IsOptional()
    @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
    @MaxLength(75, { message: 'El nombre completo no debe exceder los 75 caracteres' })
    nombre_completo?: string;

    @IsOptional()
    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    @MinLength(8, { message: 'El teléfono debe tener al menos 8 caracteres' })
    @MaxLength(15, { message: 'El teléfono no debe exceder los 15 caracteres' })
    telefono?: string;

    @IsOptional()
    @IsEnum(Roles, { message: 'El rol debe ser uno de los valores permitidos: admin, evaluador, auxiliar, evaluado' })
    rol?: Roles;

    @IsOptional()
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MaxLength(100, { message: 'La contraseña no debe exceder los 100 caracteres' })
    contrasenia?: string;

    @IsOptional()
    @IsInt({ message: 'El grado debe ser un número entero' })
    grado?: number;

    @IsOptional()
    @IsInt({ message: 'La población debe ser un número entero' })
    poblacion?: number;
    
    @IsOptional()
    @IsInt({ message: 'La población debe ser un número entero' })
    residencia?: number;
}
