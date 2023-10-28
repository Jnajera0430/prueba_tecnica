import { SqliteUserDataSource } from "../../../../src/data/dataSources/sqlite3/sqliteUserDataSource";
import { DatabaseWrapper } from "../../../../src/data/interfaces/dataSource/database-wrapper"
import { StatusEnum } from "../../../../src/domain/entities/user";

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
        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve([{
            id: 1,
            nombres: "Juan Andres",
            apellidos: "Peres torres",
            edad: 23,
            telefono: 314856588,
            email: "peresjuan@test.com",
            status: StatusEnum.ACT
        }]))
        const result = await ds.getAll();
        expect(mockDatabase.find).toHaveBeenCalledWith({});
        expect(result).toStrictEqual([{
            id: 1,
            nombres: "Juan Andres",
            apellidos: "Peres torres",
            edad: 23,
            telefono: 314856588,
            email: "peresjuan@test.com",
            status: StatusEnum.ACT
        }])
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