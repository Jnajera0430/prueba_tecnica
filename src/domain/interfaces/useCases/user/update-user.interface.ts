import { UpdateUserDto } from "../../../dto/user.dto";
import { User } from "../../../entities/user";

export interface UpdateUserUseCase {
    execute(user: UpdateUserDto): Promise<boolean>
}