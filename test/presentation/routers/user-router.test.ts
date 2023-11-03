import request from "supertest";
import { StatusEnum, User } from "../../../src/domain/entities/user";
import { CreateUserUseCase } from "../../../src/domain/interfaces/useCases/user/create-user.interface";
import { GetAllUsersUseCase } from "../../../src/domain/interfaces/useCases/user/get-all-users.interface";
import userRouter from "../../../src/presentation/routers/user-router";
import server from "../../../src/server";
import { UpdateUserUseCase } from "../../../src/domain/interfaces/useCases/user/update-user.interface";
import { PageOptionsDto } from "../../../src/domain/dto/page/pageOptions.dto";
import { PaginationDto } from "../../../src/domain/dto/page/pagination.dto";

class MockGetAllUsersUseCase implements GetAllUsersUseCase {
    execute(pageOptionsDto?: PageOptionsDto): Promise<PaginationDto<User>> {
        throw new Error("Method not implemented.");
    }
}

class MockCreateUserUseCase implements CreateUserUseCase {
    execute(user: User): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
}
class MockUpdateUserUseCase implements UpdateUserUseCase {
    execute(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

describe("user router", () => {
    let mockGetAllUsersUseCase: MockGetAllUsersUseCase;
    let mockCreateUserUseCase: MockCreateUserUseCase;
    let mockUpdateUserUseCase: MockUpdateUserUseCase

    beforeAll(() => {
        mockGetAllUsersUseCase = new MockGetAllUsersUseCase();
        mockCreateUserUseCase = new MockCreateUserUseCase();
        mockUpdateUserUseCase = new MockUpdateUserUseCase();
        server.use("/user", userRouter(mockGetAllUsersUseCase, mockCreateUserUseCase, mockUpdateUserUseCase))
    });

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("Get /user", () => {
        test("should return 200 with data ", async () => {
            const ExpectData = [{
                id: 1,
                nombres: "Juan Andres",
                apellidos: "Peres torres",
                edad: 23,
                telefono: 314856588,
                email: "peresjuan@test.com",
                status: StatusEnum.ACT
            }]
            jest.spyOn(mockGetAllUsersUseCase, "execute").mockImplementation(() => Promise.resolve({
                data: ExpectData, meta: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                    itemCount: 1,
                    page: 1,
                    pageCount: 1,
                    take: 10
                }
            }));
            const response = await request(server).get("/user");
            expect(response.status).toBe(200);
            expect(mockGetAllUsersUseCase.execute).toBeCalledTimes(1);
            expect(response.body.data).toStrictEqual(ExpectData);
        });

        test("GET /user return 500 on use case error ", async () => {
            jest.spyOn(mockGetAllUsersUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = await request(server).get("/user");
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                "error": "Internal server error."
            });
        });
    })

    describe("POST /user", () => {
        test("Post /user should create a user", async () => {
            const data = {
                id: 1,
                nombres: "Juan Andres",
                apellidos: "Peres torres",
                edad: 23,
                telefono: 314856588,
                email: "peresjuan@test.com",
                status: StatusEnum.ACT
            }
            jest.spyOn(mockCreateUserUseCase, "execute").mockImplementation(() => Promise.resolve(true))
            const response = await request(server).post("/user").send(data);
            expect(response.status).toBe(201);
        });

        test("Post /user should returns 500 on use case error", async () => {
            const data = {
                id: 1,
                nombres: "Juan Andres",
                apellidos: "Peres torres",
                edad: 23,
                telefono: 314856588,
                email: "peresjuan@test.com",
                status: StatusEnum.ACT
            }
            jest.spyOn(mockCreateUserUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/user").send(data);
            expect(response.status).toBe(500);
        });
    })

    describe('PATCH /user', () => {
        test('Patch should update a user', async () => {
            const data: User = {
                id: 1,
                nombres: "Juan Andres",
                apellidos: "Peres Torres",
                edad: 23,
                telefono: 314856588,
                email: "peresjuan@test.com",
                status: StatusEnum.ACT
            }
            jest.spyOn(mockUpdateUserUseCase, "execute").mockImplementation(() => Promise.resolve(true))
            const response = await request(server).patch('/user').send(data);
            expect(response.status).toBe(200)
        });

        test('Patch should returns 500 server error', async () => {
            const data: User = {
                id: 1,
                nombres: "Juan Andres",
                apellidos: "Peres Torres",
                edad: 23,
                telefono: 314856588,
                email: "peresjuan@test.com",
                status: StatusEnum.ACT
            }
            jest.spyOn(mockUpdateUserUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).patch('/user').send(data);
            expect(response.status).toBe(500)
            expect(response.body).toEqual({
                "error": "Internal server error."
            });
        })
    })
})