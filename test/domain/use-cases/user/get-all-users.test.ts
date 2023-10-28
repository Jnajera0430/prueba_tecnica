import { StatusEnum, User } from "../../../../src/domain/entities/user";
import { UserRepository } from "../../../../src/domain/interfaces/repositories/user-repository.interface";
import { GetAllUsers } from "../../../../src/domain/useCases/user/getAllUser";

describe('Get all users use case', () => {
    class MockUserRepository implements UserRepository {
        createUser(user: User): Promise<boolean> {
            throw new Error("Method not implemented.")
        }
        getUsers(): Promise<User[]> {
            throw new Error("Method not implemented.")
        }
        updateUser(user: User): Promise<boolean> {
            throw new Error("Method not implemented.")
        }
    }

    let mockUserRepository: UserRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepository = new MockUserRepository();
    });

    test("should returns data users", async () => {
        const ExpectData = [{
            id: 1,
            nombres: "Juan Andres",
            apellidos: "Peres torres",
            edad: 23,
            telefono: 314856588,
            email: "peresjuan@test.com",
            status: StatusEnum.ACT
        }];
        jest.spyOn(mockUserRepository, "getUsers").mockImplementation(() => Promise.resolve(ExpectData));
        const getAllUsersUse = new GetAllUsers(mockUserRepository);
        const result = await getAllUsersUse.execute();
        expect(result).toStrictEqual(ExpectData);
    })
})