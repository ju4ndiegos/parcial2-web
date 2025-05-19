/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-error';
import { Repository } from 'typeorm';

@Injectable()
export class EvaluacionProfesorService {

    constructor(
        @InjectRepository(EvaluacionEntity)
        private readonly evaluacionRepository: Repository<EvaluacionEntity>,
        @InjectRepository(ProfesorEntity)
        private readonly profesorEntity: Repository<ProfesorEntity>,
        @InjectRepository(ProyectoEntity)
        private readonly proyectoEntity: Repository<ProyectoEntity>,
    ) {}

    async addEvaluacionToProfesor(
        profesorId: string,
        proyectoId: string,
    ): Promise<EvaluacionEntity> {
        
        const profesor = await this.profesorEntity.findOne({ where: { id: profesorId } });
        if (!profesor) {
            throw new BusinessLogicException('Profesor no encontrado',BusinessError.PRECONDITION_FAILED);
        }
        const proyecto = await this.proyectoEntity.findOne({ where: { id: proyectoId } });
        if (!proyecto) {
            throw new BusinessLogicException('Proyecto no encontrado', BusinessError.PRECONDITION_FAILED);
        }
        console.log(profesor.id);
        const evaluacion = new EvaluacionEntity();
        evaluacion.proyecto = proyecto;
        evaluacion.profesor = profesor;
        
            const mentor = proyecto.mentor;
            
            if (mentor.id !== profesor.id) {
                throw new BusinessLogicException('No se pudo crear la evaluación, el evaluador no es el mentor del proyecto',BusinessError.PRECONDITION_FAILED);
            }
            if (proyecto.notaFinal < 0 || proyecto.notaFinal > 5) {
                throw new BusinessLogicException('No se pudo crear la evaluación, calificación no válida', BusinessError.PRECONDITION_FAILED);
            }
        const evaluacionGuardada:EvaluacionEntity = await this.evaluacionRepository.save(evaluacion);

        proyecto.evaluaciones = [...proyecto.evaluaciones,evaluacionGuardada];
        await this.proyectoEntity.save(proyecto);
        profesor.evaluaciones= [...profesor.evaluaciones,evaluacionGuardada];
        await this.profesorEntity.save(profesor);
        return evaluacionGuardada;
    }



}
