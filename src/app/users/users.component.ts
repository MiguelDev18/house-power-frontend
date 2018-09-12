import { UsersService } from './users.service';
import { User } from './user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  private users: Array<User>;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers(): void{
    this.usersService.getUsers().subscribe(resp => {
      this.users = resp;
    });
  }

}
