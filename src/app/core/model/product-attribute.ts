import { Attribute } from "./attribute";

export interface ProductAttribute {
    Id: number;
    ProductId: number;
    AttributeId: number;
    Value: string;

    Attribute: Attribute;
    Checked: boolean;
}
