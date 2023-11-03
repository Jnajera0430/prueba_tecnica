import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../../domain/interfaces/useCases/user/get-all-users.interface";
import { PageOptionsDto } from "../../../domain/dto/page/pageOptions.dto";
import { OrderPage } from "../../../domain/enum/page/orderPage.enum";

export const getUsers = async (req: Request, res: Response, getAllUserUseCase: GetAllUsersUseCase) => {
    try {
        let { order = OrderPage.ASC, page = 1, take = 10 } = req.query;
        let pageNum: number = 1;
        let takeNum: number = 10;
        // if (typeof order !== 'string') {
        //     order = OrderPage.ASC;
        // }
        if (page) {
            pageNum = parseInt(page.toString(), 10);
        }
        if (typeof take == 'string' && take) {
            takeNum = parseInt(take);
        }
        const pageOptionsDto: PageOptionsDto = new PageOptionsDto(order.toString(), pageNum, takeNum)
        const { data, meta } = await getAllUserUseCase.execute(pageOptionsDto);
        res.statusCode = 200;
        return res.json({
            status: 200,
            message: "List Users",
            data,
            meta
        })
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error."
        });
    }
}