
export interface IComando {
  codigo_comando: number;
  estado: boolean;
  nombre_comando: string;
  usuario_ingreso: string;
  fecha_ingreso: Date;
  usuario_modifica: string;
  fecha_modifica: Date;
}
