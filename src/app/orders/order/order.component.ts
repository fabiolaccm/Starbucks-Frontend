import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { Customer } from 'src/app/shared/customer.model';
import { CustomerService } from 'src/app/shared/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { UserService } from 'src/app/shared/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
    private dialog:MatDialog,
    private toastr: ToastrService, 
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.resetForm();
    let user = this.userService.getUserFromStorage();
    this.service.formData.ClientName = user.name;
    this.service.formData.CustomerID = user.id;
    this.service.formData.Taxes = user.province.igv;
  }

  resetForm(form?: NgForm){
    if(form=null)
    form.resetForm();
    this.service.formData = {
      OrderID: null,
      OrderNo: Math.floor(100000+Math.random()*900000).toString(),
      CustomerID: '',
      PMethod: '',
      GTotal: 0,
      ClientName: '',
      Taxes: 0
    };
    this.service.orderItems = [];
  }

  AddOrEditOrderItem(orderItemIndex, OrderID){
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
    this.service.formData.GTotal = this.service.orderItems.reduce((prev, curr) => {
      return prev+curr.Total;
    },0);

    this.service.formData.GTotal = this.service.formData.GTotal + ((this.service.formData.GTotal * this.service.formData.Taxes) / 100);

    this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
  }

  validateForm(){
    this.isValid = true;
    if(this.service.formData.PMethod == "")
      this.isValid=false;
    if(this.service.formData.CustomerID == "")
      this.isValid=false;
    else if(this.service.orderItems.length == 0)
      this.isValid=false;
    return this.isValid;
  }

  onSubmit(form: NgForm){

    if(this.validateForm())
    {

      this.dialog
      .open(ConfirmationDialogComponent, {
        data: `¿Crear la orden?`
      })
      .afterClosed()
      .subscribe((confirmation: Boolean) => {
        if (confirmation) {
          this.service.saveOrder().then(res => {
            this.resetForm();
            this.toastr.success('Orden generada exitosamente', 'Orden generada.');
            this.router.navigate(['/orders']);
          }).catch(error => {
            if(error.status == 412) {
              this.toastr.error(error.error.message, "Error");
              return;
            }
            
            this.toastr.error("Error desconocido", "Error");
          })
        }
      });
    }
  }
}
