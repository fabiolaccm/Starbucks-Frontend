import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = 'auth_token';
  private authenticate: boolean = false;

  constructor(private http: HttpClient) { }

  login(request) {
    console.log(JSON.stringify(request));
    return this.http.post(environment.apiURL+'/auth', request)
      .toPromise();
  }

  logout() {
    this.authenticate = false;
    this.removeToken();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authenticate = true;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getRolesFromToken(): string {
    let token = localStorage.getItem(this.tokenKey);
    const decodedToken: any = jwtDecode(token);
    return decodedToken["role"] || null;
  }

  getUserIdFromToken() : string {
    let token = localStorage.getItem(this.tokenKey);
    const decodedToken: any = jwtDecode(token);
    return decodedToken["id"] || null;
  }

  isUser() : boolean {
    return this.getRolesFromToken().includes("Usuario");
  }

  isEmployee() : boolean {
    return this.getRolesFromToken().includes("Empleado");
  }

  isSupervisor() : boolean {
    return this.getRolesFromToken().includes("Supervisor");
  }

  isAdmin() : boolean {
    return this.getRolesFromToken().includes("Administrador");
  }

  isAuthenticate(): boolean {
    return this.authenticate  || this.getToken() != null;
  }

}
