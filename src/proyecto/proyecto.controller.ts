/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { plainToInstance } from 'class-transformer';
import { ProyectoDto } from './proyecto.dto/proyecto.dto';

@Controller('proyecto')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService,
    ) {}

    @Post()
    async create(@Body() proyecto: ProyectoDto) {
        const proyectoEntity: ProyectoEntity = plainToInstance(ProyectoEntity, proyecto);
        return await this.proyectoService.crearProyecto(proyectoEntity);
    }

    @Post(':idProject/estudiante/:idEstudiante')
    async addEstudiante(@Param('idProject') idProject: string, @Param('idEstudiante') idEstudiante: string) {
        return await this.proyectoService.addEstudiante(idProject, idEstudiante);
    }

    @Post(':idProject/mentor/:idMentor')
    async addMentor(@Param('idProject') idProject: string, @Param('idMentor') idMentor: string) {
        return await this.proyectoService.addMentor(idProject, idMentor);
    }

    @Put(':id')
    async avanzar(@Param('id') id: string) {
        return await this.proyectoService.avanzarProyecto(id);
    }

    @Get(':idProject')
    async findAllEstudiantes(@Param('idProject') id: string) {
        return await this.proyectoService.findAllEstudiantes(id);
    }
}
