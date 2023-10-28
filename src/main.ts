import userRouter from "./presentation/routers/user-router"
import server from "./server"
import { GetAllUsers } from "./domain/useCases/user/getAllUser";
import { UserRepositoryImpl } from "./domain/repositories/userRepository";
import { CreateUser } from "./domain/useCases/user/createUser";
import { SqliteUserDataSource } from "./data/dataSources/sqlite3/sqliteUserDataSource";
import { UpdateUser } from "./domain/useCases/user/updateUser";
import userDatabaseWrapper from "./data/const/userDatabase";


(
    async () => {
        const userDatabase = await userDatabaseWrapper()
        const userMiddleware = userRouter(
            new GetAllUsers(new UserRepositoryImpl(new SqliteUserDataSource(userDatabase))),
            new CreateUser(new UserRepositoryImpl(new SqliteUserDataSource(userDatabase))),
            new UpdateUser(new UserRepositoryImpl(new SqliteUserDataSource(userDatabase)))
        )
        server.use('/user', userMiddleware)
        server.listen(8000, () => { console.log("server iniciado http://localhost:8000") })
    }
)()