import { Injectable } from '@angular/core';
import { Order } from './models/order.model';
import { OrderItem } from './models/order-item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  formData: Order = new Order();
  orderItems: OrderItem[] = [];

  constructor(private http: HttpClient) { 

  }

  saveOrder(){
    let request = {
      userId: this.formData.customerID,
      paymentMethod: this.formData.pMethod,
      totalPrice: this.formData.gTotal,
      orderNro: this.formData.orderNo,
      orderDetails: this.orderItems.map(order => {
        return {
          productId: order.itemID,
          quantity: order.quantity
        }
      })
    }

    return this.http.post(environment.apiURL+'/Orders', request);
  }

  getOrderList(){
    return this.http.get(environment.apiURL+'/Orders').toPromise();
  }

  getOrderByID(id:string) :any{
    return this.http.get(environment.apiURL+'/Orders/'+id).toPromise();
  }

  deleteOrder(id:string){
    return this.http.delete(environment.apiURL+'/Orders/'+id).toPromise();
  }

  executeOrder(id:string){
    return this.http.put(environment.apiURL+'/Orders/'+id+ '/execute', null).toPromise();
  }

  invoiceOrder(id:string){
    return this.http.put(environment.apiURL+'/Orders/'+id+ '/invoice', null).toPromise();
  }

}