/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
//import { EvaluacionDto } from "src/evaluacion/evaluacion.dto/evaluacion.dto";


export class ProfesorDto {
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
    @IsString()
    readonly departamento: number;
    
    @IsNotEmpty()
    @IsNumber()
    readonly extension: string;
    
    @IsNotEmpty()
    @IsBoolean()
    readonly esParEvaluador: boolean;

    //@IsNotEmpty()
    //mentorias: ProyectoDTO[];

    //  @IsNotEmpty()
    //@IsArray()
    //readonly evaluaciones: EvaluacionDto[];
    
}
