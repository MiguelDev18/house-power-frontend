import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from './../../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin: boolean = false;
  isUser: boolean = false;
  isNologged: boolean = true;
  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    
    //si existe el usuario en localStorage se establecen los roles
    if(localStorage.getItem('currentUser')){
      this.authenticationService.setRoles();
      this.isAdmin = this.authenticationService.isAdmin();
      this.isUser = this.authenticationService.isUser();
      this.isNologged = this.authenticationService.isNoLogged();

    } else {
      this.authenticationService.setNoLogged(true);
    }
  }

  signOut(){
    localStorage.removeItem('currentUser');
    window.location.reload();
    this.router.navigate(['/']);
  }

  



}
