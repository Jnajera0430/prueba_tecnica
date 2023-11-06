import { IsOptional, IsInt, IsString, IsNotEmpty, IsEnum, IsEmail } from "class-validator";
import { StatusEnum, User } from "../entities/user";


export class CreateUserDto implements User {
    @IsOptional()
    @IsInt()
    id!: number;

    @IsString()
    @IsNotEmpty()
    nombres!: string;

    @IsString()
    @IsNotEmpty()
    apellidos!: string;

    @IsOptional() 
    @IsInt()
    edad!: number;

    @IsOptional() 
    @IsInt()
    telefono!: number;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string;

    @IsOptional()
    @IsEnum(StatusEnum)
    status!: StatusEnum;
}

export class UpdateUserDto implements User {
    @IsNotEmpty()
    @IsInt()
    id!: number;

    @IsString()
    @IsOptional()
    nombres!: string;

    @IsString()
    @IsOptional()
    apellidos!: string;

    @IsOptional() 
    @IsInt()
    edad!: number;

    @IsOptional() 
    @IsInt()
    telefono!: number;

    @IsOptional()
    @IsString()
    @IsEmail()
    email!: string;

    @IsOptional()
    @IsEnum(StatusEnum)
    status!: StatusEnum;
}