import { Article } from "./article";
import { Product } from "./product";

export interface Menu {
    Id: number;
    ParentMenu: number;
    Group: string;
    Name: string;
    Alias: string;
    Index: number;
    ShowHomePage: boolean;
    Type: string;
    Active: boolean;

    SubMenus: Menu[];
    PMenu: Menu;

    Products: Product[],
    Articles: Article[]
}
