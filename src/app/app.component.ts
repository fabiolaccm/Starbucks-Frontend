import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Starbucks App';
  userHeader = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
    
  }

  isAuthenticate(): boolean {
    return this.authService.isAuthenticate();
  }

  getUserHeader(): string {
    let user = this.userService.getUserFromStorage();
    return "| Name: " + user.name + " | Provincia: " + user. province.name + "    | Rol: " + user.role.name;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
