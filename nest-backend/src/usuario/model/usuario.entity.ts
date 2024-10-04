import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryColumn({ unique: true })
    dpi: string;

    @Column({ type: 'boolean', default: true })
    estado: boolean;

    @Column({ length: 75 })
    nombre_completo: string;

    @Column({ unique: true })
    telefono: string;

    @Column({ unique: true })
    nombre_usuario: string;

    @Column()
    rol: string;

    @Column({ length: 100 })
    contrasenia: string;

    @Column({ nullable: false })
    grado: number;

    @Column({ nullable: false })
    poblacion: number;

    @Column({ nullable: false })
    residencia: number;
}
