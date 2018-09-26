import { User } from './../users/user.model';
import { ResponsePost } from './../response.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersCreateService {
  private saveUsersUrl = 'http://localhost:8089/save_user';

  constructor(private http:HttpClient) { }

  save(user: any): Observable<any>{
    console.log("mTodoPosT")
    console.log(user)
    return this.http.post(this.saveUsersUrl, user, httpOptions);

  }
}
