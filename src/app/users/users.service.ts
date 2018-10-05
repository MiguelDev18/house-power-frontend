import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { User } from './user.model';
import { AuthenticationService } from './../authentication.service';
import { WS_URL } from './../httpconstants';


@Injectable()
export class UsersService {

  //cabeceras de la peticion
  private httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  })
};

  //url de la peticion (url del servidor) + (endpoint)
  private usersUrl = WS_URL + "/get_users";
  private saveUsersUrl = WS_URL + '/save_user';
  private deleteUrl = WS_URL + "/delete_user";

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  //observar la lista de usuarios desde el backend
  getUsers(): Promise<User[]>{
    return this.http.get<User[]>(this.usersUrl, this.httpOptions).toPromise();
    
  }
  
  //guardar el usuario en el servidor
  save(user: any): Observable<any>{
    return this.http.post(this.saveUsersUrl, user, this.httpOptions);

  }

  //borrar user con id: userID
  deleteUser(userID: number): Observable<any>{
    return this.http.post(this.deleteUrl, JSON.stringify({"id":userID}), this.httpOptions);
    
  }
}
