import { CreateUserUseCase } from "../../domain/interfaces/useCases/user/create-user.interface";
import { GetAllUsersUseCase } from "../../domain/interfaces/useCases/user/get-all-users.interface";
import { Request, Response, Router } from "express";
import { UpdateUserUseCase } from "../../domain/interfaces/useCases/user/update-user.interface";
import { postCreateUser } from "../controllers/user/createUser.controller";
import { getUsers } from "../controllers/user/getUsers.controller";
import { patchUpdateUser } from "../controllers/user/updateUser.controller";
export default function userRouter(
    getAllUserUseCase: GetAllUsersUseCase,
    createUserUseCase: CreateUserUseCase,
    updateUserUseCase: UpdateUserUseCase
) {
    const userRouter = Router();

    userRouter.get('/', async (req: Request, res: Response) => {
        return await getUsers(req,res,getAllUserUseCase);
    });

    userRouter.post('/', async (req: Request, res: Response) => {
        return await postCreateUser(req,res,createUserUseCase);
    });

    userRouter.patch('/', async (req: Request, res: Response) => {
        return await patchUpdateUser(req,res,updateUserUseCase);
    });
    return userRouter;
}