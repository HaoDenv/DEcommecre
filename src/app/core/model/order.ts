import { Customer } from "./customer";
import { OrderDetail } from "./order-detail";

export interface Order {
    Id: number;
    CustomerCode: string;
    PhoneNumber: string;
    Address: string;
    TotalAmount: number;
    Status: number;
    Note: string;
    Created: Date;

    OrderDetails: OrderDetail[];
    Customer: Customer;
}

export class OrderStatus {
    static CHO_XAC_NHAN: number = 10;
    static DA_XAC_NHAN: number = 20;
    static DANG_VAN_CHUYEN: number = 30;
    static DA_GIAO: number = 40;
    static DA_HUY: number = 50;

    static toString(status: number): string {
        switch (status) {
            case this.CHO_XAC_NHAN:
                return "Chờ xác nhận";
            case this.DA_XAC_NHAN:
                return "Đã xác nhận";
            case this.DANG_VAN_CHUYEN:
                return "Đang vận chuyển";
            case this.DA_GIAO:
                return "Đã giao";
            case this.DA_HUY:
                return "Đã hủy";
            default:
                return "";
        }
    }
}