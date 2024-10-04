import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: 'empleo' })
export class Empleo {

    @PrimaryColumn({ type: 'varchar', length: 10 })
    ceom: string;

    @Column({ type: 'bit', width: 1 })
    estado: boolean;

    @Column({ type: 'varchar', length: 100 })
    descripcion: string;

    @Column({ type: 'varchar', length: 25, nullable: true })
    usuario_ingreso: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    fecha_ingreso: Date;

    @Column({ type: 'varchar', length: 25, nullable: true })
    usuario_modifica: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    fecha_modifica: Date;
}
