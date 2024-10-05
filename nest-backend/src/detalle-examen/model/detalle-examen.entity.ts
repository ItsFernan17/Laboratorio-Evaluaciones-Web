import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuario/model/usuario.entity';
import { Examen } from 'src/examen/model/examen.entity';
import { Pregunta } from 'src/pregunta/model/pregunta.entity';

@Entity({name: 'detalle_examen'})
export class DetalleExamen {
    @PrimaryGeneratedColumn()
    codigo_detalle: number;

    @Column()
    estado: boolean;

    @ManyToOne(() => Examen, { nullable: true })
    @JoinColumn({ name: 'examen' })
    examen: Examen;

    @ManyToOne(() => Pregunta, { nullable: true })
    @JoinColumn({ name: 'pregunta' })
    pregunta: Pregunta;

    @Column({ type: 'varchar', length: 150 })
    respuesta_dada: string;

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