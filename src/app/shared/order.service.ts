import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MenuItem } from './menuItem.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  formData:Order;
  orderItems:OrderItem[];


  constructor(private http: HttpClient) { }

  saveOrder(){
    let request = {
      userId: this.formData.CustomerID,
      paymentMethod: this.formData.PMethod,
      totalPrice: this.formData.GTotal,
      orderNro: this.formData.OrderNo,
      orderDetails: this.orderItems.map(order => {
        return {
          productId: order.ItemID,
          quantity: order.Quantity
        }
      })
    }

    return this.http.post(environment.apiURL+'/Orders', request);
  }

  getOrderList(){
    return this.http.get(environment.apiURL+'/Orders').toPromise();
  }

  getOrderByID(id:number) :any{
    return this.http.get(environment.apiURL+'/Orders/'+id).toPromise();
  }

  deleteOrder(id:number){
    return this.http.delete(environment.apiURL+'/Orders/'+id).toPromise();
  }

  executeOrder(id:string){
    return this.http.put(environment.apiURL+'/Orders/'+id+ '/execute', null).toPromise();
  }

  invoiceOrder(id:string){
    return this.http.put(environment.apiURL+'/Orders/'+id+ '/invoice', null).toPromise();
  }


}
