import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../../domain/interfaces/useCases/user/update-user.interface";
import { UpdateUserDto } from "../../../domain/dto/user.dto";
import { validate } from 'class-validator';
import { plainToClass } from "class-transformer";

export const patchUpdateUser = async (req: Request, res: Response, updateUserUseCase: UpdateUserUseCase) => {
    try {
        const createUserDto = plainToClass(UpdateUserDto, req.body);
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
        await updateUserUseCase.execute(req.body);
        res.statusCode = 200;
        res.json({
            status: 200,
            message: "User updated."
        })
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error."
        });
    }
}