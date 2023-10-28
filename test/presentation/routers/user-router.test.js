"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../../../src/domain/entities/user");
const user_router_1 = __importDefault(require("../../../src/presentation/routers/user-router"));
const server_1 = __importDefault(require("../../../src/server"));
class MockGetAllUsersUseCase {
    execute() {
        throw new Error("Method not implemented.");
    }
}
class MockCreateUserUseCase {
    execute(user) {
        throw new Error("Method not implemented.");
    }
}
describe("user router", () => {
    let mockGetAllUsersUseCase;
    let mockCreateUserUseCase;
    beforeAll(() => {
        mockGetAllUsersUseCase = new MockGetAllUsersUseCase();
        mockCreateUserUseCase = new MockCreateUserUseCase();
        server_1.default.use('user', (0, user_router_1.default)(mockGetAllUsersUseCase, mockCreateUserUseCase));
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("Get /user", () => {
        test("should return 200 with data ", () => __awaiter(void 0, void 0, void 0, function* () {
            const ExpectData = [{
                    id: 1,
                    nombres: "Juan Andres",
                    apellidos: "Peres torres",
                    edad: 23,
                    telefono: 314856588,
                    email: "peresjuan@test.com",
                    status: user_1.StatusEnum.ACT
                }];
            jest.spyOn(mockGetAllUsersUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectData));
            const response = yield (0, supertest_1.default)(server_1.default).get('/user');
            expect(response.status).toBe(200);
            expect(mockGetAllUsersUseCase.execute).toBeCalledTimes(1);
            expect(response.body).toStrictEqual(ExpectData);
        }));
        test("GET /user return 500 on use case error ", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(mockGetAllUsersUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = yield (0, supertest_1.default)(server_1.default).get("/user");
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({
                status: 500,
                error: "Internal server error."
            });
        }));
    });
});
//# sourceMappingURL=user-router.test.js.map