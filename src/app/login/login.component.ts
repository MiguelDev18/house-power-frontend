import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { AuthenticationService } from './../authentication.service';
import { User } from './../users/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private authenticationService: AuthenticationService) { }

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
        console.log(token);
        //
        if(token){
          //Guardar token en el localStorage
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}))
          console.log(localStorage.getItem('currentUser'));
        }
        else {

          swal(
            response.error,
            response.message,
            'warning'
          )
        }
      }
    )
    
  }

}
