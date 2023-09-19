
export class Ingredient {
    id: string;
    name: string;
    quantityAvailable: number;
    stockAlert: number;
    constructor() {
        this.id = '';
        this.name = '';
        this.quantityAvailable = 0;
        this.stockAlert = 0;
    }
}