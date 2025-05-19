/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProyectoDto {
    @IsNotEmpty()
    @IsString()
    readonly titulo: string;
    
    @IsNotEmpty()
    @IsString()
    readonly area: string;
    
    @IsNotEmpty()
    @IsNumber()
    readonly presupuesto: number;
    
    @IsNotEmpty()
    @IsNumber()
    readonly notaFinal: number;
    
    @IsNotEmpty()
    @IsNumber()
    readonly estado: number;
    
    @IsNotEmpty()
    @IsString()
    readonly fechaInicio: string;
    
    @IsNotEmpty()
    @IsString()
    readonly fechaFin: string;
    

}
