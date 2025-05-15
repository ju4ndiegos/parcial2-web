/* eslint-disable prettier/prettier */
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import {  Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EvaluacionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(()=>ProfesorEntity, profesor => profesor.evaluaciones)
    profesor:ProfesorEntity;

    @ManyToOne(()=>ProyectoEntity,proyecto => proyecto.evaluaciones)
    proyecto:ProyectoEntity;
}
