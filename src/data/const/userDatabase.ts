import UserModel from "../dataSources/sequalize/models/userModel";
import { DatabaseWrapper } from "../interfaces/dataSource/database-wrapper";

const userDatabaseWrapper = async ():Promise<DatabaseWrapper>=>{
    await UserModel.sync();
    const userDatabase: DatabaseWrapper = {
        find: async (query) => await UserModel.findAll({}),
        insertOne: async (doc) => { const user = UserModel.build(doc); await user.save(); },
        update: async (doc) => { const user = await UserModel.findByPk(doc.id); await user?.update(doc); }
    }

    return userDatabase;
}

export default userDatabaseWrapper;