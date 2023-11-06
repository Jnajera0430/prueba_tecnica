import { Op } from "sequelize";
import { PageMetaDto } from "../../domain/dto/page/PageMeta.dto";
import { PageOptionsDto } from "../../domain/dto/page/pageOptions.dto";
import { SearchUserDto, WhereClause } from "../../domain/dto/search/searchUser.dto";
import UserModel from "../dataSources/sequalize/models/userModel";
import { DatabaseWrapper } from "../interfaces/dataSource/database-wrapper";

const userDatabaseWrapper = async (): Promise<DatabaseWrapper> => {
    await UserModel.sync();
    const userDatabase: DatabaseWrapper = {
        find: async (query: PageOptionsDto, search: WhereClause) => {
            const whereClause: any = {};
            for (const key in search) {
                if (search[key] !== undefined) {
                    whereClause[key] = {
                        [Op.substring]: `${search[key]}`
                    };
                }
            }
            const { count, rows } = await UserModel.findAndCountAll({
                limit: query.take,
                offset: query.skip, order: [["createdAt", query.order]],
                where: whereClause
            })
            const pageMeta = new PageMetaDto({ pageOptionsDto: query, itemCount: count });
            return { rows, pageMeta };
        },
        insertOne: async (doc) => { const user = UserModel.build(doc); return await user.save(); },
        update: async (doc) => {
            const user = await UserModel.findByPk(doc.id);
            await user?.update(doc);
            return await user?.save()
        }
    }

    return userDatabase;
}

export default userDatabaseWrapper;