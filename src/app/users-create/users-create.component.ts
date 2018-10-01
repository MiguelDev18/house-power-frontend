import { User } from './../users/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsersCreateService } from './users-create.service';
import { OK } from '../httpstatus';
import { ResponsePost } from '../response.model';
import swal from 'sweetalert2'

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {

  user: User;
  private message: string;
  private response: ResponsePost;
  constructor(
    private usersCreateService: UsersCreateService, 
    private router: Router) {
      
     }

  ngOnInit() {
    if(sessionStorage.getItem("user")){
      this.user = JSON.parse(sessionStorage.getItem("user"));
      console.log(this.user);
    }else{
      this.user = new User();
      console.log("else");
      console.log(this.user);
    }
  }

  save(): void{
    console.log("save");
    console.log(this.user);
    this.usersCreateService.save(this.user).subscribe(
      response => {
        this.router.navigate(['/users']);
        console.log(response)
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
