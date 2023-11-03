import { OrderPage } from "../../enum/page/orderPage.enum";

export class PageOptionsDto {
    readonly order: OrderPage | string;
    readonly page: number;
    readonly take: number;

    constructor(order: OrderPage | string = OrderPage.ASC, page: number = 1, take: number = 10) {
        this.order = typeof order === 'string' ? order : OrderPage.ASC;
        this.page = page;
        this.take = take;
    }
    get skip(): number {
        return (this.page - 1) * this.take;
    }
}