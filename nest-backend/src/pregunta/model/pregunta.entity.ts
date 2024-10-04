import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'pregunta' })
export class Pregunta {

    @PrimaryGeneratedColumn()
    codigo_pregunta: number;

    @Column({ type: 'bit', width: 1 })
    estado: boolean;

    @Column({ type: 'varchar', length: 150 })
    enunciado: string;

    @Column({ type: 'int' })
    banco_respuestas: number;

    @Column({ type: 'varchar', length: 25, nullable: true })
    usuario_ingreso: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    fecha_ingreso: Date;

    @Column({ type: 'varchar', length: 25, nullable: true })
    usuario_modifica: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    fecha_modifica: Date;
}
