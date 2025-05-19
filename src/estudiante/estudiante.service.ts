/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-error';

@Injectable()
export class EstudianteService {
     constructor(
       @InjectRepository(EstudianteEntity)
       private readonly estudianteRepository: Repository<EstudianteEntity>
   ){}

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if ((estudiante.promedio < 3.2 || estudiante.semestre<4)){
            throw new BusinessLogicException("No se pudo crear, revisar promedio de al menos 3.2 y semestre al menos 4", BusinessError.PRECONDITION_FAILED)
        }
        
        return await this.estudianteRepository.save(estudiante);
        }

    async delete(id: string): Promise<void> {
       const estudiante = await this.estudianteRepository.findOne({where:{id}});
       if (!estudiante)
         throw new BusinessLogicException("Not found", BusinessError.NOT_FOUND);
    
       await this.estudianteRepository.remove(estudiante);
   }

   async findAll(): Promise<EstudianteEntity[]> {
       return await this.estudianteRepository.find();
   }

   async findAllEstudiantes(idProject:string): Promise<EstudianteEntity[]> {
       return await this.estudianteRepository.find({
              where: {
                proyectos: { id: idProject }
              },
              relations: ['proyectos']
       });
   }
}



