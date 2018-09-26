import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { User } from './user.model';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UsersService {

  private usersUrl = "http://localhost:8089/get_users";
  private deleteUrl = "http://localhost:8089/delete_user";

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl);
    
  }
  public deleteUser(userID: number): Observable<any>{
    return this.http.post(this.deleteUrl, JSON.stringify({"id":userID}), httpOptions);
    
  }
}
