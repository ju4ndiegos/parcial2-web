/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionEntity } from './evaluacion.entity/evaluacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EvaluacionEntity]),TypeOrmModule.forFeature([ProyectoEntity])],
  providers: [EvaluacionService],
  controllers: [],

})
export class EvaluacionModule {}
