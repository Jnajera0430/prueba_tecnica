import { UserDataSource } from "../../data/interfaces/dataSource/user-data-source";
import { PageOptionsDto } from "../dto/page/pageOptions.dto";
import { PaginationDto } from "../dto/page/pagination.dto";
import { SearchUserDto } from "../dto/search/searchUser.dto";
import { User } from "../entities/user";
import { UserRepository } from "../interfaces/repositories/user-repository.interface";

export class UserRepositoryImpl implements UserRepository {
    userDataSource: UserDataSource;

    constructor(userDataSource: UserDataSource) {
        this.userDataSource = userDataSource;
    }

    async createUser(user: User): Promise<boolean> {
        return await this.userDataSource.create(user);
    }
    async getUsers(pageOptionsDto?: PageOptionsDto,searchOptions?: SearchUserDto): Promise<PaginationDto<User>> {
        const result = await this.userDataSource.getAll(pageOptionsDto,searchOptions);
        const users: User[] = result.rows.map((item: User) => ({
            ...item
        }));
        return new PaginationDto(users, result.pageMeta);
    }

    async updateUser(user: User): Promise<boolean> {
        return await this.userDataSource.update(user);
    }
}