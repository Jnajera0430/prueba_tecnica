import { User } from "../../entities/user";
import { UserRepository } from "../../interfaces/repositories/user-repository.interface";
import { UpdateUserUseCase } from "../../interfaces/useCases/user/update-user.interface";

export class UpdateUser implements UpdateUserUseCase{
    userRepository: UserRepository;
    constructor(userRepository:UserRepository){
        this.userRepository = userRepository;
    }
    async execute(user: User): Promise<boolean> {
        return await this.userRepository.updateUser(user);
    }
}