import { PageOptionsDto } from "../../../../src/domain/dto/page/pageOptions.dto";
import { PaginationDto } from "../../../../src/domain/dto/page/pagination.dto";
import { StatusEnum, User } from "../../../../src/domain/entities/user";
import { UserRepository } from "../../../../src/domain/interfaces/repositories/user-repository.interface";
import { CreateUser } from "../../../../src/domain/useCases/user/createUser";

describe('Create user Use case',()=>{
    class MockUserRepository implements UserRepository {
        createUser(user: User): Promise<boolean> {
            throw new Error("Method not implemented.")
        }
        getUsers(pageOptionsDto?: PageOptionsDto): Promise<PaginationDto<User>> {
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
    test("should return true", async () => {
        const data = {
            id: 1,
            nombres: "Juan Andres",
            apellidos: "Peres torres",
            edad: 23,
            telefono: 314856588,
            email: "peresjuan@test.com",
            status: StatusEnum.ACT
        }
        jest.spyOn(mockUserRepository,"createUser").mockImplementation(()=>Promise.resolve(true));
        const createUserUseCase = new CreateUser(mockUserRepository);
        const result = await createUserUseCase.execute(data);
        expect(result).toBe(true);
    });
})