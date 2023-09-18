import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StockItemComponent } from '../orders/stock-item/stock-item.component';
import { Ingredient } from './ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) { 

  }

  findAll() {
    return this.http.get(environment.apiURL+'/ingredients')
      .toPromise();
  }

  findOne(id: string) {
    return this.http.get(environment.apiURL+'/ingredients/' + id)
      .toPromise();
  }

  update(obj: Ingredient) {
    return this.http.put(environment.apiURL+'/ingredients/' + obj.id, obj)
      .toPromise();
  }


}
