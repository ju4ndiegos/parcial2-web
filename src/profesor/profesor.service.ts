/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-error';

@Injectable()
export class ProfesorService {
    
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>
    ) {}

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        
        if ((profesor.extension < 10000 || profesor.extension > 99999) ) {
            throw  new BusinessLogicException("No se pudo crear, revisar extensión", BusinessError.PRECONDITION_FAILED)
        }
        
        
        return await this.profesorRepository.save(profesor);
    }
    async asignarEvaluador(id:string): Promise<ProfesorEntity> {
        const profesor = await this.profesorRepository.findOne({ where: { id } });
        if (!profesor) {
            throw new BusinessLogicException('Profesor no encontrado', BusinessError.BAD_REQUEST);
        }
        if (profesor.evaluaciones.length >= 3) {
            throw new BusinessLogicException('Profesor no puede ser evaluador, tiene al menos 3 evaluaciones activas', BusinessError.PRECONDITION_FAILED);
        }
        profesor.esParEvaluador = true;
        return await this.profesorRepository.save(profesor);
    }
}
