/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EvaluacionEntity } from './evaluacion.entity/evaluacion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';

@Injectable()
export class EvaluacionService {
     constructor(
         @InjectRepository(EvaluacionEntity)
           private readonly evaluacionRepository: Repository<EvaluacionEntity>,
        @InjectRepository(ProyectoEntity)
           private readonly proyectoEntity: Repository<ProyectoEntity>,
        ){}

        
        async crearEvaluacion(evaluacion: EvaluacionEntity): Promise<EvaluacionEntity> {
            const  proyecto:ProyectoEntity = evaluacion.proyecto;
            if (!proyecto) {
                throw new Error('No se pudo crear la evaluación, proyecto no encontrado');
            }
            const proyectoExistente = await this.proyectoEntity.findOne({ where: { id: proyecto.id } });
            if (!proyectoExistente) {
                throw new Error('No se pudo crear la evaluación, proyecto no encontrado');
            }

            const evaluador = evaluacion.profesor;
            if (!evaluador) {
                throw new Error('No se pudo crear la evaluación, evaluador no encontrado');
            }
            const mentor = proyectoExistente.mentor;
            if (!mentor) {
                throw new Error('No se pudo crear la evaluación, mentor no encontrado');
            }
            if (mentor.id !== evaluador.id) {
                throw new Error('No se pudo crear la evaluación, el evaluador no es el mentor del proyecto');
            }
            if (proyecto.notaFinal < 0 || proyecto.notaFinal > 5) {
                throw new Error('No se pudo crear la evaluación, calificación no válida');
            }
            return await this.evaluacionRepository.save(evaluacion);
        }
    }
