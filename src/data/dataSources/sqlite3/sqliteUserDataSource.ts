import { PageOptionsDto } from "../../../domain/dto/page/pageOptions.dto";
import { PaginationDto } from "../../../domain/dto/page/pagination.dto";
import { User } from "../../../domain/entities/user";
import { DatabaseWrapper, FindInterface } from "../../interfaces/dataSource/database-wrapper";
import { UserDataSource } from "../../interfaces/dataSource/user-data-source";

export class SqliteUserDataSource implements UserDataSource {
    private database:DatabaseWrapper;
    constructor(database:DatabaseWrapper){
        this.database = database;
    }
    async create(user: User): Promise<boolean> {
        const result = await this.database.insertOne(user);
        return result !== null;
    }
    async getAll(pageOptionsDto?: PageOptionsDto): Promise<FindInterface> {
        return await this.database.find(pageOptionsDto);
    }

    async update(user: User): Promise<boolean> {
        const result = await this.database.update(user);
        console.log(result);
        
        return result !== null    
    }
}