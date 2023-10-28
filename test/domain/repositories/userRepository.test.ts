import { UserDataSource } from "../../../src/data/interfaces/dataSource/user-data-source";
import { StatusEnum, User } from "../../../src/domain/entities/user";
import { UserRepository } from "../../../src/domain/interfaces/repositories/user-repository.interface";
import { UserRepositoryImpl } from "../../../src/domain/repositories/userRepository";

class MockUserDataSource implements UserDataSource {
    create(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    update(user: User): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
}

describe("User repository", () => {
    let mockUserDataSource: UserDataSource;
    let userRepository: UserRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUserDataSource = new MockUserDataSource();
        userRepository = new UserRepositoryImpl(mockUserDataSource);
    })

    describe("getAllUsers", () => {
        test('should returns datas users', async () => {
            const ExpectData = [{
                id: 1,
                nombres: "Juan Andres",
                apellidos: "Peres torres",
                edad: 23,
                telefono: 314856588,
                email: "peresjuan@test.com",
                status: StatusEnum.ACT
            }];
            jest.spyOn(mockUserDataSource, "getAll").mockImplementation(() => Promise.resolve(ExpectData));
            const result = await userRepository.getUsers();
            expect(result).toBe(ExpectData);
        });
    })

    describe("createUser", () => {
        test('should returns true', async () => {
            const data = {
                id: 1,
                nombres: "Juan Andres",
                apellidos: "Peres torres",
                edad: 23,
                telefono: 314856588,
                email: "peresjuan@test.com",
                status: StatusEnum.ACT
            }
            jest.spyOn(mockUserDataSource, "create").mockImplementation(() => Promise.resolve(true));
            const result = await userRepository.createUser(data);
            expect(result).toBe(true);
        });
    })

    describe("updateUser", () => {
        test('should returns true', async () => { 
            const data = {
                id: 1,
                nombres: "Juan Andres",
                apellidos: "Peres torres",
                edad: 23,
                telefono: 314856588,
                email: "peresjuan@test.com",
                status: StatusEnum.ACT
            }
            jest.spyOn(mockUserDataSource, "update").mockImplementation(() => Promise.resolve(true));
            const result = await userRepository.updateUser(data);
            expect(result).toBe(true);
        })
    })
})