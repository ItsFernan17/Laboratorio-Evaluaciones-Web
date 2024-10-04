import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'banco_respuestas' })
export class BancoRespuestas {

    @PrimaryGeneratedColumn()
    codigo_respuesta: number;

    @Column({ type: 'bit', width: 1 })
    estado: boolean;

    @Column({ type: 'varchar', length: 100 })
    respuesta: string;

    @Column({ type: 'varchar', length: 25, nullable: true })
    usuario_ingreso: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    fecha_ingreso: Date;

    @Column({ type: 'varchar', length: 25, nullable: true })
    usuario_modifica: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    fecha_modifica: Date;
}
