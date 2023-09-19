export class OrderItem {
    orderItemID: number;
    orderID: number;
    itemID: number;
    quantity: number;
    itemName:string;
    price: number;
    total: number;

    constructor() {
        this.orderItemID = 0;
        this.orderID = 0;
        this.itemID = 0;
        this.quantity = 0;
        this.itemName = '';
        this.price = 0;
        this.total = 0;
    }

}
