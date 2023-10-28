import { CreateUserDto } from "../../../dto/user.dto";
import { User } from "../../../entities/user";

export interface CreateUserUseCase {
    execute(user: CreateUserDto): Promise<Boolean>
}