import { SqliteUserDataSource } from "../../../../src/data/dataSources/sqlite3/sqliteUserDataSource";
import { DatabaseWrapper } from "../../../../src/data/interfaces/dataSource/database-wrapper"
import { StatusEnum } from "../../../../src/domain/entities/user";
import { OrderPage } from "../../../../src/domain/enum/page/orderPage.enum";

describe("Sqlite dataSource", () => {
    let mockDatabase: DatabaseWrapper;
    beforeAll(async () => {
        mockDatabase = {
            find: jest.fn(),
            insertOne: jest.fn(),
            update: jest.fn()
        }
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("get All", async () => {
        const ds = new SqliteUserDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "find").mockImplementation(async (query) => {
            expect(query).toEqual({ order: OrderPage.ASC, page: 1, take: 10 });
            return Promise.resolve({
                rows: [{
                    id: 1,
                    nombres: "Juan Andres",
                    apellidos: "Peres torres",
                    edad: 23,
                    telefono: 314856588,
                    email: "peresjuan@test.com",
                    status: StatusEnum.ACT
                }],
                pageMeta: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                    itemCount: 1,
                    page: 1,
                    pageCount: 1,
                    take: 10
                }
            });
        })
    })

    test("create", async () => {
        const ds = new SqliteUserDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "insertOne").mockImplementation(() => Promise.resolve({
            id: 1,
        }))
        const result = await ds.create({
            nombres: "Juan Andres",
            apellidos: "Peres torres",
            edad: 23,
            telefono: 314856588,
            email: "peresjuan@test.com",
            status: StatusEnum.ACT
        });
        expect(mockDatabase.insertOne).toHaveBeenCalledWith({
            nombres: "Juan Andres",
            apellidos: "Peres torres",
            edad: 23,
            telefono: 314856588,
            email: "peresjuan@test.com",
            status: StatusEnum.ACT
        })
        expect(result).toStrictEqual(true);
    })
    test("update", async () => {
        const ds = new SqliteUserDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "update").mockImplementation(() => Promise.resolve({
            id: 1,
        }))
        const result = await ds.update({
            id: 1,
            nombres: "Juan Andres",
            apellidos: "Peres torres",
            edad: 23,
            telefono: 314856588,
            email: "peresjuan@test.com",
            status: StatusEnum.ACT
        });
        expect(mockDatabase.update).toHaveBeenCalledWith({
            id: 1,
            nombres: "Juan Andres",
            apellidos: "Peres torres",
            edad: 23,
            telefono: 314856588,
            email: "peresjuan@test.com",
            status: StatusEnum.ACT
        })
        expect(result).toStrictEqual(true);
    })
})  