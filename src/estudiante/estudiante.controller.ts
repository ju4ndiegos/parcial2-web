/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { EstudianteService } from './estudiante.service';



@Controller('estudiante')
export class EstudianteController {
    constructor(private readonly estudianteService:EstudianteService) {}

    @Post()
    async create(@Body() estudiante: EstudianteDto) {
        const estudianteEntity: EstudianteEntity = plainToInstance(EstudianteEntity, estudiante);
        return await this.estudianteService.crearEstudiante(estudianteEntity);
    }

    @Get('/all')
    async findAll() {
        return await this.estudianteService.findAll();
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        console.log(id);
        if (!id) {
            throw new Error('ID is required');
        }
        return await this.estudianteService.delete(id);
    }
    
}
