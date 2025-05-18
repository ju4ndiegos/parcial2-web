/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
                private readonly proyectoRepository: Repository<ProyectoEntity>,
    ) {}

    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        if (proyecto.presupuesto <0 && proyecto.titulo.length <= 15) {
            throw new Error('No se pudo crear el proyecto, valide presupuesto >0 y titulo > 15 caracteres');
        }
        return await this.proyectoRepository.save(proyecto);
    }

    async avanzarProyecto(id: string): Promise<ProyectoEntity> {
        const proyecto = await this.proyectoRepository.findOne({ where: { id } });
        if (!proyecto) {
            throw new Error('Proyecto no encontrado');
        }
        if (proyecto.estado === 4) {
            throw new Error('El proyecto ya está en su máximo estado');
        }
        proyecto.estado ++;
        return await this.proyectoRepository.save(proyecto);
    }
    async findAllEstudiantes(idProject:string): Promise<EstudianteEntity[]> {
        const proyectos : ProyectoEntity[] = await this.proyectoRepository.find({
            where: {
                id: idProject
            },
            relations: ['lider']
        });

        if (proyectos.length === 0) {
            throw new Error('No se encontraron proyectos con ese ID');
        }
        const estudiantes: EstudianteEntity[] = proyectos.map(proyecto => proyecto.lider);
        if (estudiantes.length === 0) {
            throw new Error('No se encontraron estudiantes asociados a este proyecto');
        }
        return estudiantes;
    }
}
