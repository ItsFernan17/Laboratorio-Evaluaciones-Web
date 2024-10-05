export interface Pregunta {
    codigo_pregunta: number;
    estado: boolean;
    enunciado: string;
    banco_respuestas: number;
    usuario_ingreso: string;
    fecha_ingreso: Date;
    usuario_modifica: string;
    fecha_modifica: Date;
}
