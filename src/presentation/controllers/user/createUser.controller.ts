import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../domain/interfaces/useCases/user/create-user.interface";
import { CreateUserDto } from "../../../domain/dto/user.dto";
import { validate } from 'class-validator';
import { plainToClass } from "class-transformer";

export const postCreateUser = async (req: Request, res: Response, createUserUseCase: CreateUserUseCase) => {
    try {
        const createUserDto = plainToClass(CreateUserDto, req.body);
        const errors = await validate(createUserDto);
        
        if (errors.length > 0) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.map((error) => ({
                    field: error.property,
                    constraints: error.constraints,
                })),
            });
        }
        await createUserUseCase.execute(createUserDto);
        return res.status(201).json({
            status: 201,
            message: 'User created.',
        });

    } catch (err) {
        res.status(500).json({
            error: "Internal server error."
        });
        console.log(err);

    }
}