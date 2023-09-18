import { Injectable } from '@angular/core';
import { User } from './user.model';
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

  getUsers() : Promise<object> {
    return this.http.get(environment.apiURL+'/users').toPromise();
  }

  getUser(userId){
    return this.http.get(environment.apiURL+'/users/' + userId).toPromise();
  }

  createOrUpdateUser(user){
    console.log("createOrUpdateUser: " + JSON.stringify(user));
    if (user.Id == null) {
      return this.http.post(environment.apiURL+'/users', user).toPromise();  
    }
    return this.http.put(environment.apiURL+'/users/' + user.Id, user).toPromise();
  }

  deleteUser(userId) {
    return this.http.delete(environment.apiURL+'/users/' + userId).toPromise();
  }

  setUserStorage(target) {
    localStorage.setItem("user", JSON.stringify(target));
  }

  getUserFromStorage() : User {
    let user = JSON.parse(localStorage.getItem("user"));
    return user as User;
  }
}
