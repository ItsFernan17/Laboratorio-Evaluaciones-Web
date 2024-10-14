import { Examen } from 'src/examen/model/examen.entity';
import { Usuario } from 'src/usuario/model/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('asignacion')
export class Asignacion {
    @PrimaryGeneratedColumn()
    codigo_asignacion: number;

    @Column({ type: 'bit', width: 1 })
    estado: boolean;

    @ManyToOne(() => Examen, { nullable: true })
    @JoinColumn({ name: 'pregunta' })
    examen: Examen;

    @ManyToOne(() => Usuario, { nullable: true })
    @JoinColumn({ name: 'evaluado' })
    evaluado: Usuario;

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