import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers()
    .then(res => {
      this.users = res as User[];
    });
  }

  openForEdit(id: string){
    this.router.navigate(['/users/edit/'+ id]);
  }

  deleteUser(id: string){

    let currentUser = this.userService.getUserFromStorage();

    if(id == currentUser.id) {
      this.toastr.error("No puedes eliminar al usuario actual", "Error");
      return;
    }

    this.userService.deleteUser(id)
    .then(res => {
      this.loadUsers();
    });
  }

  AddOrEditUser(userId: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data = {userId};
    this.dialog.open(UserDetailComponent, dialogConfig)
    .afterClosed()
    .subscribe(res => {
      this.loadUsers();
    });
  }
}
