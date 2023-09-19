export class OrderResumen {
    id: string;
    orderNro: string;
    userId: string;
    totalPrice: number;
    status: string;
    paymentMethod: string;
    creationDate: string;
    completionDate: string;
    orderDetails: OrderResumenDetail[];

    constructor() {
        this.totalPrice = 0;
        this.id = '';
        this.orderNro = '';
        this.paymentMethod = '';
        this.userId = '';
        this.status = '';
        this.creationDate = '';
        this.completionDate = '';
        this.orderDetails = [];
    }
}

export class OrderResumenDetail {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    constructor() {
        this.id = '';
        this.orderId = '';
        this.productId = '';
        this.quantity = 0;
    }
}