import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Province } from 'src/app/shared/models/province.model';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { RoleService } from 'src/app/shared/role.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  formData: User = new User();
  users: User[] = [];
  roles: Role[] = [];
  provinces: Province[] = [];
  buttonText: string = "Crear";
  isValid:boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserDetailComponent>,
    private userService: UserService,
    private roleService: RoleService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.userService.getProvinces()
    .then(res => this.provinces = res as Province[]);

    this.userService.getUsers()
      .then(res => this.users = res as User[]);

    this.roleService.getRoles()
    .then(res => this.roles = res as Role[]);
 
    this.formData = new User();

    if (this.data.userId != '') {
      this.buttonText = "Actualizar";
      this.userService.getUser(this.data.userId)
      .then(res => this.formData = res as User);
    }
  }

  onSubmit(form: NgForm){
    if(this.validateForm(form.value)){
      this.userService.createOrUpdateUser(form.value)
      .then(res => {
        let msg = (form.value.Id) ?  "Actualizado Correctamente" : "Registrado Correctamente";
        this.toastr.success(msg, "Success");
        this.dialogRef.close();
      })
      .catch(ex => {
        this.toastr.error(ex.error.message);
      });
      
    }
  }

  validateForm(formData:User){
    this.isValid = true;
    if (formData.email == "") {
      this.isValid = false;
    }
    else if(formData.name == "") {
      this.isValid = false;
    }
    else if(formData.roleId == "0") {
      this.isValid = false;
    }
    return this.isValid;
  }
}
