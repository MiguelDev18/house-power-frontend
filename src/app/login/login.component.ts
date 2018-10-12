import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from "@angular/router";

import { AuthenticationService } from './../authentication.service';
import { User } from './../users/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    //cargar usuario desde el localStorage
    if(localStorage.getItem('currentUser')){
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }else{
      //si no hay usuario en el localStorage crear uno nuevo
      this.user = new User();
    }
  }

  login(): void{
    this.authenticationService.loginUser(this.user.username, this.user.password).subscribe(
      response => {
        let token = response.token;
        let username = response.user.username;
        let roles = response.user.authorities;
        //
        if(token){
          //Guardar token en el localStorage
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: token, roles:roles}))
          this.authenticationService.setRoles();
        }
        
        window.location.reload();
        if(this.authenticationService.isAdmin()){
          this.router.navigate(['/users']);
          
        

        } else {
          //cargar pagina de hogares
          this.router.navigate(['/houses']);
          
        
        }
        
      },
      //desplegar mensaje de error
      error => 
      swal(
        error.error.error,
        error.error.mensaje,
        'warning'
      )

    )

    
  }

}
