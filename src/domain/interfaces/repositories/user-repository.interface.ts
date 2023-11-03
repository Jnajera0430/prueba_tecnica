import { PaginationDto } from "../../dto/page/pagination.dto";
import { User } from "../../entities/user";
import { PageOptionsDto } from '../../dto/page/pageOptions.dto'

export interface UserRepository {
    createUser(user: User): Promise<boolean>;
    getUsers(pageOptionsDto?: PageOptionsDto): Promise<PaginationDto<User>>;
    updateUser(user: User): Promise<boolean>;
}