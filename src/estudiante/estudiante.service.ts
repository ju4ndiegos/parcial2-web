/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {
     constructor(
       @InjectRepository(EstudianteEntity)
       private readonly estudianteRepository: Repository<EstudianteEntity>
   ){}

    async crearEstudiante(estudiante): Promise<EstudianteEntity> {
        if (! (estudiante instanceof EstudianteEntity || ! (estudiante.promedio >= 3.2 || estudiante.semestre>=4))){
            throw Error("No se pudo crear")
        }
        
        return await this.estudianteRepository.save(estudiante) as EstudianteEntity;
        }

    async delete(id: number) {
       const estudiante = await this.estudianteRepository.findOne({where:{id}});
       if (!estudiante)
         throw Error("Not found");
    
       await this.estudianteRepository.remove(estudiante);
   }
   }



