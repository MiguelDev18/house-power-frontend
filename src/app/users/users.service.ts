import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { User } from './user.model';
import { WS_URL } from './../httpconstants';

//cabeceras de la peticion
const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UsersService {

  //url de la peticion (url del servidor) + (endpoint)
  private usersUrl = WS_URL + "/get_users";
  private saveUsersUrl = WS_URL + '/save_user';
  private deleteUrl = WS_URL + "/delete_user";

  constructor(private http: HttpClient) { }

  //observar la lista de usuarios desde el backend
  getUsers(): Promise<User[]>{
    return this.http.get<User[]>(this.usersUrl).toPromise();
    
  }
  
  //guardar el usuario en el servidor
  save(user: any): Observable<any>{
    return this.http.post(this.saveUsersUrl, user, httpOptions);

  }

  //borrar user con id: userID
  deleteUser(userID: number): Observable<any>{
    return this.http.post(this.deleteUrl, JSON.stringify({"id":userID}), httpOptions);
    
  }
}
