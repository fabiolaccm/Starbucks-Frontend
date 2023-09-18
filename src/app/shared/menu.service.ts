import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) {

  }

  getMenus() {
    return this.http.get(environment.apiURL + '/products').toPromise();
  }


}
