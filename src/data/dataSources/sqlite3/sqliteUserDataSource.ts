import { User } from "../../../domain/entities/user";
import { DatabaseWrapper } from "../../interfaces/dataSource/database-wrapper";
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
    async getAll(): Promise<User[]> {
        const result = await this.database.find({});
        return result.map((item:User)=>({
            ...item
        }));
    }

    async update(user: User): Promise<boolean> {
        const result = await this.database.update(user);
        return result !== null    
    }
}