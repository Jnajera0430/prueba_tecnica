import { User } from "../../entities/user";
import { UserRepository } from "../../interfaces/repositories/user-repository.interface";
import { GetAllUsersUseCase } from "../../interfaces/useCases/user/get-all-users.interface";

export class GetAllUsers implements GetAllUsersUseCase{
    private readonly userRespository:UserRepository;
    constructor(userRepository:UserRepository){
        this.userRespository = userRepository;
    }
    async execute(): Promise<User[]> {
        return await this.userRespository.getUsers();
    }
}