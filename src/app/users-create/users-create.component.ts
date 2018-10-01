import { User } from './../users/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import swal from 'sweetalert2'

import { UsersService } from './../users/users.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {

  user: User;
  
  constructor(
    private usersService: UsersService, 
    private router: Router) { }

  ngOnInit() {
    //cargar usuario desde el sessionStorage
    if(sessionStorage.getItem("user")){
      this.user = JSON.parse(sessionStorage.getItem("user"));
    }else{
      //si no hay usuario en el sessionStorage crear uno nuevo
      this.user = new User();
    }
  }

  saveUser(): void{
    this.usersService.save(this.user).subscribe(
      response => {
        //cargar pagina de usuarios
        this.router.navigate(['/users']);
        //desplegar mensaje de exito
        swal(
          'Usuario Guardado!',
          response.message,
          'success'
        )
      }
    );
    sessionStorage.clear();
  }

}
