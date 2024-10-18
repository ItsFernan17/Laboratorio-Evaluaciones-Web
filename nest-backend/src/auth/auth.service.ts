import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {

        const usuario = await this.usuarioService.findByDPI(registerDto.dpi);

        if(usuario) {
            throw new BadRequestException('El usuario ya existe');
        }

        const register = await this.usuarioService.createUsuario({
            ...registerDto,
            password: await bcryptjs.hash(registerDto.password, 10),
        });

        const { password, ...result } = register;

        return result;
    }


    async login(loginDto: LoginDto) {
        const usuario = await this.usuarioService.findByUsername(loginDto.usuario);
    
        if (!usuario) {
            throw new UnauthorizedException('El usuario no es correcto');
        }
    
        const isPasswordValid = await bcryptjs.compare(loginDto.password, usuario.password);
    
        if (!isPasswordValid) {
            throw new UnauthorizedException('La contraseña no es correcta');
        }
    
        const payload = { user: usuario.nombre_usuario, sub: usuario.dpi };
    
        // Generar access token
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '30m' });
    
        // Generar refresh token con mayor duración
        const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
    
        return {
            accessToken,
            refreshToken, // Enviar también el refresh token
            usuario: usuario.nombre_usuario,
        };
    }

}
