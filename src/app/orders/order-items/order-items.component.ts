import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';
import { MenuService } from '../../shared/menu.service';
import { MenuItem } from 'src/app/shared/menuItem.model';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {
  formData: OrderItem;

  items: MenuItem[];
  item: MenuItem = null;
  isValid:boolean = true;
  viewDetailProduct: boolean = false;
  lastIndexProductSelected: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService:ItemService,
    private orderService: OrderService,
    private menuService: MenuService) { }

  ngOnInit() {

    this.menuService.getMenus()
      .then(res => {
        this.items = res as MenuItem[];
      });

    if(this.data.orderItemIndex == null)
      this.formData = {
        OrderItemID: null,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: '',
        Price: 0,
        Quantity: 0,
        Total: 0
      }
    else
      this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]);
  }

  updatePrice(ctrl){
    this.lastIndexProductSelected = ctrl.selectedIndex;
    if(ctrl.selectedIndex == 0){
      this.formData.Price = 0;
      this.formData.ItemName = '';
      this.formData.Quantity = 0;
      this.item = null;
    }
    else
    {
      this.formData.Quantity = 0;
      this.formData.Price = this.items[ctrl.selectedIndex-1].price;
      this.formData.ItemName = this.items[ctrl.selectedIndex-1].name;
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
    this.formData.Total = parseFloat((this.formData.Quantity*this.formData.Price).toFixed(2));
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
    if(formData.ItemID == 0)
    this.isValid = false;
    else if(formData.Quantity == 0)
    this.isValid = false;
    return this.isValid;
  }

}
