import { Ingredient } from "./ingredients.model";

export class MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    preparationTime: number;
    productItems: ProductItem[]
}

export class ProductItem {
    productItemId: string;
    quantity: number;
    ingredients: Ingredient[]
}