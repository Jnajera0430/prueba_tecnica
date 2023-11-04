import { PageOptionsDto } from "../../../domain/dto/page/pageOptions.dto";
import { PaginationDto } from "../../../domain/dto/page/pagination.dto";
import { SearchUserDto } from "../../../domain/dto/search/searchUser.dto";
import { User } from "../../../domain/entities/user";
import { FindInterface } from "./database-wrapper";

export interface UserDataSource {
    create(user: User): Promise<boolean>;
    getAll(pageOptionsDto?: PageOptionsDto,searchOptions?: SearchUserDto): Promise<FindInterface>;
    update(user: User): Promise<boolean>
}