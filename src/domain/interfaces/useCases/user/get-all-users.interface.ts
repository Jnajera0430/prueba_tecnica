import { PageOptionsDto } from "../../../dto/page/pageOptions.dto";
import { PaginationDto } from "../../../dto/page/pagination.dto";
import { SearchUserDto } from "../../../dto/search/searchUser.dto";
import { User } from "../../../entities/user";

export interface GetAllUsersUseCase {
    execute(pageOptionsDto?: PageOptionsDto,searchOptions?: SearchUserDto):Promise<PaginationDto<User>>;
}