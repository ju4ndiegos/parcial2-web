/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity/evaluacion.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import { EvaluacionProfesorService } from './evaluacion-profesor.service';
import { EvaluacionController } from './evaluacion.controller';

@Module({imports: [TypeOrmModule.forFeature([EvaluacionEntity]),TypeOrmModule.forFeature([ProfesorEntity]),TypeOrmModule.forFeature([ProyectoEntity])],
        providers: [EvaluacionProfesorService],
        controllers: [EvaluacionController],})
export class EvaluacionProfesorModule {}
