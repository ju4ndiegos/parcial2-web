/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ProyectoEntity])],
  providers: [ProyectoService],
  controllers: [],
})
export class ProyectoModule {}
