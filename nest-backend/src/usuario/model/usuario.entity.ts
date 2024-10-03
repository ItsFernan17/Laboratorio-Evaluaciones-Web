import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryColumn()
    DPI: string;  //Clave primaria no se  genera automáticamente

    @Column({ type: 'boolean', default: true })
    ESTADO: boolean;

    @Column({ length: 75 })
    NOMBRE_COMPLETO: string;

    @Column({ unique: true })
    TELEFONO: string;

    @Column({ unique: true })
    NOMBRE_USUARIO: string;

    @Column()
    ROL: string;

    @Column({ length: 100 })
    CONTRASENIA: string;

    @Column({ nullable: false })
    GRADO: number;

    @Column({ nullable: false })
    POBLACION: number;
}
