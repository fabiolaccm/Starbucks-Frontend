import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private authService: AuthService) {

  }

  getProvinces() {
    return this.http.get(environment.apiURL+'/provinces').toPromise();
  }

  getUsers() {
    return this.http.get(environment.apiURL+'/users').toPromise();
  }

  getUser(userId:string){
    return this.http.get(environment.apiURL+'/users/' + userId).toPromise();
  }

  createOrUpdateUser(user: User) {
    
    if (user.id == '') {
      return this.http.post(environment.apiURL+'/users', user).toPromise();  
    }
    return this.http.put(environment.apiURL+'/users/' + user.id, user).toPromise();
  }

  deleteUser(userId: string) {
    return this.http.delete(environment.apiURL+'/users/' + userId).toPromise();
  }

  setUserStorage(target: User) {
    localStorage.setItem("user", JSON.stringify(target));
  }

  getUserFromStorage() : User {
    let user = JSON.parse(localStorage.getItem("user") as string);
    return user as User;
  }
}
