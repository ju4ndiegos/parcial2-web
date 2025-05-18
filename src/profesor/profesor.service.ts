/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesorService {
    
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>
    ) {}

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        if ((profesor.extension === 5)){
            throw  Error("No se pudo crear")
        }
        
        return await this.profesorRepository.save(profesor);
    }
    async asignarEvaluador(id:string): Promise<ProfesorEntity> {
        const profesor = await this.profesorRepository.findOne({ where: { id } });
        if (!profesor) {
            throw new Error('Profesor no encontrado');
        }
        if (profesor.evaluaciones.length >= 3) {
            throw new Error('Profesor no puede ser evaluador, tiene al menos 3 evaluaciones activas');
        }
        profesor.esParEvaluador = true;
        return await this.profesorRepository.save(profesor);
    }
}
