import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { StatusEnum, User } from "../../entities/user";

export class SearchUserDto {
    @IsOptional()
    @IsInt()
    id?: number | undefined;
    @IsOptional()
    @IsString()
    nombres?: string;
    @IsOptional()
    @IsString()
    apellidos?: string;
    @IsOptional()
    @IsInt()
    edad?: number | undefined;
    @IsOptional()
    @IsString()
    email?: string;
    @IsOptional()
    @IsEnum(StatusEnum)
    status?: StatusEnum;

    constructor(id: number, nombres: string, apellidos: string, edad: number, email: string, status: StatusEnum) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.edad = edad;
        this.email = email;
        this.status = status;
    }
}

export interface WhereClause{
    [key: string]: any;
}