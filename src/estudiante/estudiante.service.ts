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

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if ((estudiante.promedio < 3.2 || estudiante.semestre<4)){
            throw  Error("No se pudo crear")
        }
        
        return await this.estudianteRepository.save(estudiante);
        }

    async delete(id: string): Promise<void> {
       const estudiante = await this.estudianteRepository.findOne({where:{id}});
       if (!estudiante)
         throw Error("Not found");
    
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



