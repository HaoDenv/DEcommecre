import { Attribute } from "./attribute";
import { Menu } from "./menu";
import { ProductAttribute } from "./product-attribute";
import { ProductImage } from "./product-image";
import { ProductRelated } from "./product-related";
import { Review } from "./review";

export interface Product {
    Id: number;
    MenuId: number;
    Name: string;
    Alias: string;
    Image: string;
    Index: number;
    Status: number;
    Price: number;
    DiscountPrice: number;
    Selling: boolean;
    ShortDescription: string;
    Description: string;

    ProductImages: ProductImage[];
    ProductRelateds: ProductRelated[];
    ProductAttributes: ProductAttribute[];
    Reviews: Review[];

    Menu: Menu;
    Attributes: Attribute[];

    TotalQty: number;
    TotalAmount: number;
    RateAvg: number;
}
