import { Product } from "./product";

export interface Review {
    Id?: number;
    OrderDetailId?: number;
    ProductId?: number;
    Star: number;
    Content: string;
    Status: number;
    Created?: Date;
    CreatedBy?: string;

    Product?: Product;
}
