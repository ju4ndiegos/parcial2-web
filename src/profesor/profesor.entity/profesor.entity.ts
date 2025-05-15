/* eslint-disable prettier/prettier */
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfesorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    departamento: string;

    @Column()
    extension: number;

    @Column()
    esParSeparado: boolean;

    @OneToMany(()=>ProyectoEntity, proyecto => proyecto.mentor)
    mentorias:ProyectoEntity[];

    @OneToMany(()=> EvaluacionEntity, evaluacion => evaluacion.profesor)
    evaluaciones: EvaluacionEntity[];

}
