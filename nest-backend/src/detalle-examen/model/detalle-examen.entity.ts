import { Entity, Column , PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'detalle_examen'})
export class detalleExamen{
    @PrimaryGeneratedColumn()
    codigo_detalle: number;

    @Column()
    estado: boolean;

    @Column({type: 'int'})
    examen: number;

    @Column({type: 'int'})
    pregunta: number;

    @Column({type: 'varchar', length: 150})
    respuesta_dada: string;

    @Column({type: 'varchar', length: 25, nullable: true})
    usuario_ingreso: string;

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true})
    fecha_ingreso: Date;

    @Column({type: 'varchar', length: 25, nullable: true})
    usuario_modifica: string;

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true})
    fecha_modifica: Date;
}