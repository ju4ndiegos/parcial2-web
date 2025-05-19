/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoController } from './proyecto.controller';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProyectoEntity]), TypeOrmModule.forFeature([EstudianteEntity]), TypeOrmModule.forFeature([ProfesorEntity])],
  providers: [ProyectoService],
  controllers: [ProyectoController],
})
export class ProyectoModule {}
