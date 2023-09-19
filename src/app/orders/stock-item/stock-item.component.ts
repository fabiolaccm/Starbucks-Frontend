import { Component, Inject, OnInit } from '@angular/core';
import { StockService } from '../../shared/stock.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {

  formData: Ingredient = new Ingredient();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      private stockService: StockService,
      private dialog:MatDialog,
      public dialogRef: MatDialogRef<StockItemComponent>,
      private toastr: ToastrService) { 
  }

  ngOnInit() {
    this.formData = new Ingredient();
    this.stockService.findOne(this.data.ingredientId)
    .then(res => {
      this.formData = res as Ingredient;
    });

  }

  onSubmit(form: NgForm) {
    this.stockService.update(this.formData)
    .then(res => {
      this.toastr.success("Stock Actualizado correctamente", "Success");
      this.dialogRef.close();
    }).catch(res => {
      if(res.status == 412) {
        this.toastr.error(res.error.message, "Error");
        return;
      }
      this.toastr.error("Error desconocido", "Error");
    });
  }

}
