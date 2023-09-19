export class Order {
    orderID: number;
    orderNo: string;
    customerID: string;
    pMethod: string;
    gTotal: number;
    clientName: string;
    taxes: number;

    constructor() {
        this.orderID = 0;
        this.orderNo = '';
        this.customerID = '';
        this.pMethod = '';
        this.gTotal = 0;
        this.clientName = '';
        this.taxes = 0;
    }
}
