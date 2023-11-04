import { PaginationDto } from "../../dto/page/pagination.dto";
import { User } from "../../entities/user";
import { PageOptionsDto } from '../../dto/page/pageOptions.dto'
import { SearchUserDto } from "../../dto/search/searchUser.dto";

export interface UserRepository {
    createUser(user: User): Promise<boolean>;
    getUsers(pageOptionsDto?: PageOptionsDto, searchOptions?: SearchUserDto): Promise<PaginationDto<User>>;
    updateUser(user: User): Promise<boolean>;
}