import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Order } from 'src/app/shared/models/order.model';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  isValid: boolean = true;
  name: string = "";
  paymentMethod: string = "";

  constructor(private service: OrderService,
    private dialog: MatDialog,
    private toastr: ToastrService, 
    private router: Router,
    private userService: UserService) {

    }

  getOrderService() {
    return this.service
  }  

  ngOnInit() {
    this.resetForm();
    let user = this.userService.getUserFromStorage();
    this.service.formData.clientName = user.name;
    this.service.formData.customerID = user.id;
    this.service.formData.taxes = user.province.igv;
  }

  resetForm(form?: NgForm){
    //if (form==null)
    //form.resetForm();
    this.service.formData = new Order();
    this.service.formData.orderNo = Math.floor(100000+Math.random()*900000).toString()
    this.service.orderItems = [];
  }

  AddOrEditOrderItem(orderItemIndex: any, OrderID: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {orderItemIndex, OrderID};
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }

  onDeleteOrderItem(i: number){
    this.service.orderItems.splice(i,1);
    this.updateGrandTotal();
  }

  updateGrandTotal(){
    this.service.formData.gTotal = this.service.orderItems.reduce((prev, curr) => {
      return prev+curr.total;
    },0);
    
    this.service.formData.gTotal = this.service.formData.gTotal + ((this.service.formData.gTotal * this.service.formData.taxes) / 100);
    this.service.formData.gTotal = parseFloat(this.service.formData.gTotal.toFixed(2));
  }

  validateForm() {
    this.isValid = true;
    if(this.service.formData.pMethod == "")
      this.isValid=false;
    if(this.service.formData.customerID == "")
      this.isValid=false;
    else if(this.service.orderItems.length == 0)
      this.isValid=false;
    return this.isValid;
  }

  onSubmit(form: NgForm) {
    if(this.validateForm())
    {
      this.dialog
      .open(ConfirmationDialogComponent, {
        data: `¿Crear la orden?`
      })
      .afterClosed()
      .subscribe((confirmation: Boolean) => {
        if (confirmation) {
          this.service.saveOrder()
          .pipe(
            catchError((error) => {
              if(error.status == 412) {
                this.toastr.error(error.error.message, "Error");
                return throwError(() => new Error('Ocurrió un error en la llamada a la API. Detalles: ' + error.message));
              }
              
              this.toastr.error("Error desconocido", "Error");
              return throwError(() => new Error('Ocurrió un error en la llamada a la API. Detalles: ' + error.message));
            })
          )
          .subscribe(res => {
            this.resetForm();
            this.toastr.success('Orden generada exitosamente', 'Orden generada.');
            this.router.navigate(['/orders']);
          });
        }
      });
    }
  }
}
