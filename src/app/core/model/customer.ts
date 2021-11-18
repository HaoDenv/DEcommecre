import { Order } from "./order";

export interface Customer {
    Code: string;
    UserName: string;
    Password: string;
    FullName: string;
    Avatar: string;
    PhoneNumber: string;
    Email: string;
    Address: string;
    Dob: string;
    Phone: string;
    Gender: string;
    LastLogin: Date;

    Token: string;
    Orders: Order[]
}
