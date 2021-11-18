import { Product } from "./product";

export interface ProductRelated {
    Id: number;
    ProductId: number;
    ProductRelatedId: number;

    Product: Product
}
