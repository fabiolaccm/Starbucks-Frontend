import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { OrderResumen } from '../shared/order-resumen.model';
import { Order } from '../shared/order.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orderList: OrderResumen[] = [];
  title: string = "Ordenes";

  constructor(private service: OrderService,
    private authService: AuthService,
    private userService: UserService,
    private router:Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(){
    this.service.getOrderList()
      .then(res => {
        this.orderList = [];
        let response = res as OrderResumen[];
        console.log(JSON.stringify(response));
        if (response.length > 0) {
          let currentUser = this.userService.getUserFromStorage();
          console.log(currentUser.id);
          if (this.authService.isUser()) {
            this.orderList = response.filter(s => s.userId == currentUser.id);
            this.title = "Mis Ordenes";
          } else {
            this.orderList = response;
            this.title = "Gestión de Ordenes";
          }
        }
      });
  }

  newOrder() {
    this.router.navigate(['/order']);
  }
  onOrderDelete(id:number){
    if(confirm('¿Está seguro que quiere eliminar esta orden?')){
      this.service.deleteOrder(id).then(res =>{
        this.refreshList();
        this.toastr.success("Orden eliminada correctamente.", "Orden Eliminada");
      });
    }
  }

  executeOrder(id:string){
    if(confirm('¿Está seguro que desea ejecutar esta orden?')){
      this.service.executeOrder(id).then(res =>{
        this.refreshList();
        this.toastr.success("Orden ejecutada correctamente.", "Orden Ejecutada");
      });
    }
  }

  invoiceOrder(id:string) {
    if(confirm('¿Está seguro que desea facturar esta orden?')){
      this.service.invoiceOrder(id).then(res =>{
        this.refreshList();
        this.toastr.success("Orden facturada correctamente.", "Orden Facturada");
      });
    }
  }

}
