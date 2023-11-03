import { PageOptionsDto } from "../../../dto/page/pageOptions.dto";
import { PaginationDto } from "../../../dto/page/pagination.dto";
import { User } from "../../../entities/user";

export interface GetAllUsersUseCase {
    execute(pageOptionsDto?: PageOptionsDto):Promise<PaginationDto<User>>;
}