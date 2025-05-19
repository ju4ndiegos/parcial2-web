/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-error';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
                private readonly proyectoRepository: Repository<ProyectoEntity>,
            @InjectRepository(EstudianteEntity)
                private readonly estudianteRepository: Repository<EstudianteEntity>,
            @InjectRepository(ProfesorEntity)
                private readonly profesorRepository: Repository<ProfesorEntity>,
    ) {}

    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        if (proyecto.presupuesto <0 || proyecto.titulo.length <= 15) {
            throw new BusinessLogicException('No se pudo crear el proyecto, valide presupuesto >0 y titulo > 15 caracteres', BusinessError.PRECONDITION_FAILED);
        }
        return await this.proyectoRepository.save(proyecto);
    }

    async addEstudiante(idProject: string, idEstudiante: string): Promise<ProyectoEntity> {
        const proyecto = await this.proyectoRepository.findOne({ where: { id: idProject } });
        if (!proyecto) {
            throw new BusinessLogicException('Proyecto no encontrado', BusinessError.NOT_FOUND);
        }
        const estudiante = await this.estudianteRepository.findOne({ where: { id: idEstudiante } });
        if (!estudiante) {
            throw new BusinessLogicException('Estudiante no encontrado', BusinessError.NOT_FOUND);
        }
        
        proyecto.lider =estudiante;
        const proyectoGuardado = await this.proyectoRepository.save(proyecto);
        estudiante.proyectos = [...estudiante.proyectos, proyectoGuardado];
        await this.estudianteRepository.save(estudiante);
        return proyectoGuardado;
    }

    async addMentor(idProject: string, idMentor: string): Promise<ProyectoEntity> {
        const proyecto = await this.proyectoRepository.findOne({ where: { id: idProject } });
        if (!proyecto) {
            throw new BusinessLogicException('Proyecto no encontrado', BusinessError.NOT_FOUND);
        }
        const mentor = await this.profesorRepository.findOne({ where: { id: idMentor } });
        if (!mentor) {
            throw new BusinessLogicException('Mentor no encontrado', BusinessError.NOT_FOUND);
        }
        proyecto.mentor = mentor;
        const proyectoGuardado = await this.proyectoRepository.save(proyecto);
        mentor.mentorias = [...mentor.mentorias, proyectoGuardado];
        await this.profesorRepository.save(mentor);
        return proyectoGuardado;
    }

    async avanzarProyecto(id: string): Promise<ProyectoEntity> {
        const proyecto = await this.proyectoRepository.findOne({ where: { id } });
        if (!proyecto) {
            throw new BusinessLogicException('Proyecto no encontrado', BusinessError.NOT_FOUND);
        }
        if (proyecto.estado === 4) {
            throw new BusinessLogicException('El proyecto ya está en su máximo estado', BusinessError.PRECONDITION_FAILED);
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
            throw new BusinessLogicException('No se encontraron proyectos con ese ID', BusinessError.NOT_FOUND);
        }
        const estudiantes: EstudianteEntity[] = proyectos.map(proyecto => proyecto.lider);
        if (estudiantes.length === 0) {
            throw new BusinessLogicException('No se encontraron estudiantes asociados a este proyecto', BusinessError.NOT_FOUND);
        }
        return estudiantes;
    }
}
