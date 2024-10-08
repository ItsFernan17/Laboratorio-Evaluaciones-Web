import { Entity, Column , PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from 'src/usuario/model/usuario.entity';
import { Empleo } from "src/empleo/model/empleo.entity";

@Entity({name: 'examen'})
export class Examen{
    @PrimaryGeneratedColumn()
    codigo_examen: number;

    @Column({ type: 'bit', width: 1 })
    estado: boolean;

    @Column({ type: 'date' })
    fecha_evaluacion: Date;

    @ManyToOne(() => Usuario, { nullable: true })
    @JoinColumn({ name: 'usuario' })
    usuario: Usuario;

    @ManyToOne(() => Empleo, { nullable: true })
    @JoinColumn({ name: 'empleo' })
    empleo: Empleo;

    @Column({ type: 'int' })
    punteo_total: number;

    @ManyToOne(() => Usuario, { nullable: true })
    @JoinColumn({ name: 'usuario_ingreso' })
    usuario_ingreso: Usuario;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    fecha_ingreso: Date;

    @ManyToOne(() => Usuario, { nullable: true })
    @JoinColumn({ name: 'usuario_modifica' })
    usuario_modifica: Usuario;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    fecha_modifica: Date;
}