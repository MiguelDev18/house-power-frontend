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

  //arreglo de usuarios para cargar en la vista
  users: Array<User>;

  constructor(
    private usersService: UsersService,
    private housesService: HousesService,
    private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  //cargar lista de usuarios desde el backend
  loadUsers(): void{
    this.usersService.getUsers().then(resp => {
      this.users = resp;
    });
  }

  //ir a la pagina de hogares usando los datos del usuario
  loadHousesPage(user: User): void{
    //almacenar los datos del usuario en el sessionStorage
    sessionStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['houses']);
  }

  //cargar el formulario de creacion de nuevos usuarios
  newUser(): void{
    sessionStorage.clear();
    this.router.navigate(['users/create_users']);
  }

  //cargar el formulario de edicion de usuarios 
  editUser(user: User): void{
    sessionStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['users/create_users']);
  }


  deleteUser(user: User): void{
    //desplegar mensaje de confirmacion
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
      //ejecutar la peticion si se confirma la accion
      if (result.value){
        this.usersService.deleteUser(user.id).subscribe(
          respose => {
            //cargar nuevamente la lista de usuarios
            this.loadUsers();
            //mostrar mensaje de exito
            swal(
              'Usuario Eliminado!',
              respose.message,
              'success'
            )
          }
        );
      }
    });
  }

}
