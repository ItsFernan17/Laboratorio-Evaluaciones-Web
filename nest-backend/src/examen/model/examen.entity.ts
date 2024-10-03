import { Entity, Column , PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'examen'})
export class Examen{
    @PrimaryGeneratedColumn()
    codigo_examen: number;

    @Column()
    estado: boolean;

    @Column({type: 'date'})
    fecha_evaluacion: Date;

    @Column({type: 'varchar', length: 15})
    usuario: string;

    @Column({type: 'varchar', length: 10})
    empleo: string;

    @Column({type: 'int'})
    punteo_total: number;

    @Column({type: 'varchar', length: 25, nullable: true})
    usuario_ingreso: string;

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true})
    fecha_ingreso: Date;

    @Column({type: 'varchar', length: 25, nullable: true})
    usuario_modifica: string;

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true})
    fecha_modifica: Date;
}