import { Component, OnInit } from '@angular/core';
import { StockItemComponent } from '../stock-item/stock-item.component';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StockService } from 'src/app/shared/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor(private stockService: StockService,     
    private dialog:MatDialog) { 
  }

  updateStock(ingredientId: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {ingredientId};
    this.dialog.open(StockItemComponent, dialogConfig).afterClosed().subscribe(res => {
      this.listData();
    });
  }

  ngOnInit() {
    this.listData();
  }

  listData() {
    this.stockService.findAll()
    .then(res => {
      this.ingredients = res as Ingredient[];
    });
  }

}
