/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { EstudianteService } from './estudiante.service';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-error';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';



@Controller('estudiante')
@UseInterceptors(BusinessErrorsInterceptor)
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
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        console.log(id);
        if (!id) {
            throw new BusinessLogicException('ID is required',BusinessError.NOT_FOUND);
        }
        return await this.estudianteService.delete(id);
    }
    
}
