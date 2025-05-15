/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [EstudianteModule, ProfesorModule, ProyectoModule, EvaluacionModule,
    TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'postgres',
     database: 'museum',
     entities: [EstudianteModule, ProfesorModule, ProyectoModule, EvaluacionModule],
     dropSchema: true,
     synchronize: true,
     //keepConnectionAlive: true
   }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
