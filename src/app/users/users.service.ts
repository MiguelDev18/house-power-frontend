import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

import { User } from './user.model';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>("http://localhost:8089/get_users");
    
  }
}
