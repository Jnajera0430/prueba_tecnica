import { UserDataSource } from "../../data/interfaces/dataSource/user-data-source";
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
    async getUsers(): Promise<User[]> {
        return await this.userDataSource.getAll();
    }

    async updateUser(user: User): Promise<boolean> {
        return await this.userDataSource.update(user);
    }
}