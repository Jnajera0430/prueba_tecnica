import { PageOptionsDto } from "../../dto/page/pageOptions.dto";
import { PaginationDto } from "../../dto/page/pagination.dto";
import { User } from "../../entities/user";
import { UserRepository } from "../../interfaces/repositories/user-repository.interface";
import { GetAllUsersUseCase } from "../../interfaces/useCases/user/get-all-users.interface";

export class GetAllUsers implements GetAllUsersUseCase {
    private readonly userRespository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRespository = userRepository;
    }
    async execute(pageOptionsDto?: PageOptionsDto): Promise<PaginationDto<User>> {
        return await this.userRespository.getUsers(pageOptionsDto);
    }
}