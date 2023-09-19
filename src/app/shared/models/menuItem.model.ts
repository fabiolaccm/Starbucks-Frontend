import { Ingredient } from "./ingredient.model";

export class MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    preparationTime: number;
    productItems: ProductItem[];
    constructor() {
        this.id = '';
        this.name = '';
        this.description = '';
        this.price = 0;
        this.preparationTime = 0
        this.productItems = []
    }
}

export class ProductItem {
    productItemId: string;
    quantity: number;
    ingredient: Ingredient;
    constructor() {
        this.productItemId = '';
        this.quantity = 0;
        this.ingredient = new Ingredient()
    }
}