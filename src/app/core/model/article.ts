import { Menu } from "./menu";

export interface Article {
    Id: number;
    MenuId: number;
    Title: string;
    Alias: string;
    Image: string;
    Index: number;
    ShortDescription: string;
    Description: string;
    Active: boolean;
    Created: Date;

    Menu: Menu
}
