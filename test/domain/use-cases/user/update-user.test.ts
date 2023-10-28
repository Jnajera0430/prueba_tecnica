import { StatusEnum, User } from "../../../../src/domain/entities/user";
import { UserRepository } from "../../../../src/domain/interfaces/repositories/user-repository.interface";
import { UpdateUser } from "../../../../src/domain/useCases/user/updateUser";

describe("Update user use case", () => {
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

    test('should returns true wich has been updated', async ()=>{
        const data = {
            id: 1,
            nombres: "Juan Andres",
            apellidos: "Peres torres",
            edad: 23,
            telefono: 314856588,
            email: "peresjuan@test.com",
            status: StatusEnum.ACT
        }
        jest.spyOn(mockUserRepository,"updateUser").mockImplementation(()=>Promise.resolve(true));
        const updateUserUseCase = new UpdateUser(mockUserRepository);
        const result = await updateUserUseCase.execute(data);
        expect(result).toBe(true);
    })
})