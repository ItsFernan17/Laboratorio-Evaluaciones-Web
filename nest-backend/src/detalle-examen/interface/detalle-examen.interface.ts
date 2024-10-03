
export interface detalleExamen{

    codigo_examen: number,
    estado: boolean,
    examen: number,
    pregunta: number,
    respuesta_dada: string,
    punteo_total: number,
    usuario_ingreso: string,
    fecha_ingreso: Date,
    usuario_modifica: string,
    fecha_modifica: Date
}