export class OrderResumen {
    id: string;
    orderNro: string;
    userId: string;
    status: string;
    creationDate: string;
    completionDate: string;
    orderDetails: OrderResumenDetail[];
}

export class OrderResumenDetail {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
}