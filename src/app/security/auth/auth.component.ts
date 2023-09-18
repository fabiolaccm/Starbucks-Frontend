import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Login } from 'src/app/shared/login.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  formData: Login;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.formData = {
      email: '',
      password: ''
    }
  }

  onSubmit(form: NgForm) {
    this.authService.login(form.value)
      .then(resp => {
        this.authService.setToken(resp['token']);
        let id = this.authService.getUserIdFromToken();
        this.userService.getUser(id)
          .then(userRes => {
            let user = userRes as User;
            this.userService.setUserStorage(user);
            if (this.authService.isUser()) {
              this.router.navigate(['/order']);  
            } else if (this.authService.isEmployee()) {
              this.router.navigate(['/orders']);
            } else if (this.authService.isAdmin()) {
              this.router.navigate(['/admin']);
            }else if (this.authService.isSupervisor()) {
              this.router.navigate(['/supervisor']);
            }
            else {
              this.router.navigate(['/order']);
            }
          });
      })
      .catch(error => {
        console.log(error);
        this.toastr.error("Credenciales incorrectas", "Error");
      });
  }

}
