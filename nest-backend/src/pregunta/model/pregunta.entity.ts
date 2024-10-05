import { BancoRespuestas } from "src/banco_respuestas/model/banco_respuestas.entity";
import { Usuario } from "src/usuario/model/usuario.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: 'pregunta' })
export class Pregunta {

    @PrimaryGeneratedColumn()
    codigo_pregunta: number;

    @Column({ type: 'bit', width: 1 })
    estado: boolean;

    @Column({ type: 'varchar', length: 150 })
    enunciado: string;

    @ManyToOne(() => BancoRespuestas, { nullable: true })
    @JoinColumn({ name: 'banco_respuestas' })
    banco_respuestas: BancoRespuestas;

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
