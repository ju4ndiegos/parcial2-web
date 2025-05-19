/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { ProfesorService } from './profesor.service';
import { ProfesorDto } from './profesor.dto/profesor.dto';
import { plainToInstance } from 'class-transformer';
import { ProfesorEntity } from './profesor.entity/profesor.entity';

@Controller('profesor')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
    constructor(private readonly profesorService:ProfesorService){}

    @Post()
    async create(@Body() profesor: ProfesorDto) {
        const profesorEntity: ProfesorEntity = plainToInstance(ProfesorEntity, profesor);
        return await this.profesorService.crearProfesor(profesorEntity);
    }

    @Put(':id')
    async asignarEvaluador(@Param('id') id: string) {
        return await this.profesorService.asignarEvaluador(id);
    }
}
