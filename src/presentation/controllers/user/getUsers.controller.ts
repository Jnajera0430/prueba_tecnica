import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../../domain/interfaces/useCases/user/get-all-users.interface";

export const getUsers = async (req: Request, res: Response, getAllUserUseCase: GetAllUsersUseCase) => {
    try {
        const users = await getAllUserUseCase.execute();
        res.statusCode = 200;
        return res.json({
            status: 200,
            message: "List Users",
            data: users
        })
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error."
        });
    }
}