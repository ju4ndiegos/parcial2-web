/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { EvaluacionProfesorService } from 'src/evaluacion-profesor/evaluacion-profesor.service';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-error';

@Controller('evaluacion')
@UseInterceptors(BusinessErrorsInterceptor)
export class EvaluacionController {
    constructor(private readonly evaluacionProfesorProyectoService:EvaluacionProfesorService){}

    @Post('Proyecto/:idProyecto/Profesor/:idProfesor')
    async create(@Param('idProyecto') idProyecto: string, @Param('idProfesor') idProfesor: string) {
        const evaluacionEntity = await this.evaluacionProfesorProyectoService.addEvaluacionToProfesor(idProfesor, idProyecto);
        if (!evaluacionEntity) {
            throw new BusinessLogicException('No se pudo crear la evaluación', BusinessError.PRECONDITION_FAILED);
        }

        return evaluacionEntity;
    }
}
