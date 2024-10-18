// auth/interfaces/user-request.interface.ts
import { Request } from 'express';

// Define la interfaz para el objeto `user` que incluye `username`
export interface UserRequest extends Request {
  user: {
    dpi: string;
    username: string;
    // Agrega otras propiedades que tengas en el token JWT si es necesario
  };
}
