import { HousesService } from './../houses/houses.service';
import { UsersService } from './users.service';
import { User } from './user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  users: Array<User>;

  constructor(
    private usersService: UsersService,
    private housesService: HousesService,
    private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void{
    this.usersService.getUsers().subscribe(resp => {
      this.users = resp;
    });
  }
  loadHousesPage(user: User): void{
    sessionStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['houses']);
  }
  newUser(): void{
    sessionStorage.clear();
    this.router.navigate(['users/create_users']);
  }
  editUser(user: User): void{
    sessionStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['users/create_users']);
  }
  deleteUser(user: User): void{
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al usuario ${user.username} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value){
        this.usersService.deleteUser(user.id).subscribe(
          respose => {
            this.loadUsers();
            console.log(respose)
            swal(
              'Cliente Eliminado!',
              respose.message,
              'success'
            )
          }
        );
      }
    });
  }

}
