import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from 'src/usuario/model/usuario.entity';

@Entity({ name: 'banco_respuestas' })
export class BancoRespuestas {

    @PrimaryGeneratedColumn()
    codigo_respuesta: number;

    @Column({ type: 'bit', width: 1 })
    estado: boolean;

    @Column({ type: 'varchar', length: 100 })
    respuesta: string;

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
