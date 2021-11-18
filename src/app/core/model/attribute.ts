import { ProductAttribute } from "./product-attribute";

export interface Attribute {
    Id: number;
    Name: string;

    ProductAttributes: ProductAttribute[];
}
