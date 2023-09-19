import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { OrderItem } from 'src/app/shared/models/order-item.model';
import { MenuItem } from 'src/app/shared/models/menuItem.model';

import { OrderService } from 'src/app/shared/order.service';
import { MenuService } from '../../shared/menu.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {
  formData: OrderItem = new OrderItem();

  items: MenuItem[] = [];
  item: MenuItem = new MenuItem();
  isValid:boolean = true;
  viewDetailProduct: boolean = false;
  lastIndexProductSelected: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private orderService: OrderService,
    private menuService: MenuService) { }

  ngOnInit() {

    this.menuService.getMenus()
      .then(res => {
        this.items = res as MenuItem[];
      });

    if(this.data.orderItemIndex == null) {
      this.formData = new OrderItem();
      this.formData.orderID = this.data.OrderID;
    }   
    else {
      this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]);
    }
      
  }

  updatePrice(ctrl: any){
    this.lastIndexProductSelected = ctrl.selectedIndex;
    if(ctrl.selectedIndex == 0){
      this.formData.price = 0;
      this.formData.itemName = '';
      this.formData.quantity = 0;
      this.item = new MenuItem();
    }
    else
    {
      this.formData.quantity = 0;
      this.formData.price = this.items[ctrl.selectedIndex-1].price;
      this.formData.itemName = this.items[ctrl.selectedIndex-1].name;
      this.item = this.items[ctrl.selectedIndex - 1];
    }
    this.viewDetailProduct = false;
    this.updateTotal();
  }

  viewDetail() {
    if(this.lastIndexProductSelected == 0) {
      this.viewDetailProduct = false;
      return;
    }
    this.viewDetailProduct = !this.viewDetailProduct;
  }

  updateTotal(){
    this.formData.total = parseFloat((this.formData.quantity*this.formData.price).toFixed(2));
  }

  onSubmit(form: NgForm){
    if(this.validateForm(form.value)){
      if(this.data.orderItemIndex == null)
      this.orderService.orderItems.push(form.value);
      else 
      this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      this.dialogRef.close();
    }
  }

  validateForm(formData:OrderItem){
    this.isValid = true;
    if(formData.itemID == 0)
    this.isValid = false;
    else if(formData.quantity == 0)
    this.isValid = false;
    return this.isValid;
  }

}
