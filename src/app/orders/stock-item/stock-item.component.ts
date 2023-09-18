import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { StockService } from '../../shared/stock.service';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {

  formData: Ingredient;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
      private stockService: StockService,
      private dialog:MatDialog,
      public dialogRef: MatDialogRef<StockItemComponent>,
      private toastr: ToastrService) { 
  }

  ngOnInit() {
    this.formData = {
      id: '',
      name: '',
      quantityAvailable: 0,
      stockAlert: 0
    };

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
