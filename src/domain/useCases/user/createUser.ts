import { User } from "../../entities/user";
import { UserRepository } from "../../interfaces/repositories/user-repository.interface";
import { CreateUserUseCase } from "../../interfaces/useCases/user/create-user.interface";

export class CreateUser implements CreateUserUseCase{
    private readonly userRespository:UserRepository;
    constructor(userRepository:UserRepository){
        this.userRespository = userRepository;
    }
    async execute(user: User): Promise<Boolean> {
        return await this.userRespository.createUser(user);
    }
}