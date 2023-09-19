import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/shared/order.service';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';
import { OrderResumen } from 'src/app/shared/models/order-resumen.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
    private toastr: ToastrService,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.refreshList();
  }

  getAuthService() {
    return this.authService;
  }

  refreshList(){
    this.service.getOrderList()
      .then(res => {
        this.orderList = [];
        let response = res as OrderResumen[];
        if (response.length > 0) {
          let currentUser = this.userService.getUserFromStorage();
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
  onOrderDelete(id:string){
    
    this.dialog
    .open(ConfirmationDialogComponent, {
      data: `¿Está seguro que quiere eliminar esta orden?`
    })
    .afterClosed()
    .subscribe((confirmation: Boolean) => {
      if (confirmation) {
        this.service.deleteOrder(id).then(res =>{
          this.refreshList();
          this.toastr.success("Orden eliminada correctamente.", "Orden Eliminada");
        });
      }
    });

  }

  executeOrder(id:string){
    this.dialog
    .open(ConfirmationDialogComponent, {
      data: `¿Está seguro que desea ejecutar esta orden?`
    })
    .afterClosed()
    .subscribe((confirmation: Boolean) => {
      if (confirmation) {
        this.service.executeOrder(id).then(res =>{
          this.refreshList();
          this.toastr.success("Orden ejecutada correctamente.", "Orden Ejecutada");
        });
      }
    });
  }

  invoiceOrder(id:string) {

    this.dialog
    .open(ConfirmationDialogComponent, {
      data: `¿Está seguro que desea facturar esta orden?`
    })
    .afterClosed()
    .subscribe((confirmation: Boolean) => {
      if (confirmation) {
        this.service.invoiceOrder(id).then(res =>{
          this.refreshList();
          this.toastr.success("Orden facturada correctamente.", "Orden Facturada");
        });
      }
    });

  }

}
