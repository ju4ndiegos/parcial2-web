/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
export class EstudianteDto {
    //@IsNotEmpty()
    //@IsString()
    //readonly id: number;
 
    @IsNotEmpty()
    @IsNumber()
    readonly cedula: number;
 
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;
 
    @IsNotEmpty()
    @IsNumber()
    readonly semestre: number;
 
    @IsNotEmpty()
    @IsString()
    readonly programa: string;
 
    @IsNotEmpty()
    @IsNumber()
    readonly promedio: number;

     //@IsNotEmpty()
     //proyectos: ProyectoEntity[];
    
    }