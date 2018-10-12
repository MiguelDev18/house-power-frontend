import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { throwError } from 'rxjs';

import { WS_URL } from './httpconstants';
import { catchError } from 'rxjs/operators';

//cabeceras de la peticion
const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private roles: Array<any>  = null;
  private roleAdmin: boolean = false;
  private roleUser: boolean = false;
  private noLogged: boolean = true;

  //url de la peticion (url del servidor) + (endpoint)
  private loginUrl = WS_URL + "/login";

  constructor(private http: HttpClient) {

   }

  loginUser(username: string, password: string): Observable<any>{
    return this.http.post(this.loginUrl, JSON.stringify({username: username, password: password}), httpOptions)
    .pipe(
      catchError(/*this.hError<boolean>('addHero')*/(error:any) =>  throwError(error || 'Server error'))
    );
  }

  //obtener el token desde el localStorage
  getToken(): string{
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = "";
    if(currentUser){
      token = currentUser.token
    }
    
    return token; 

  }
  //determinar los roles de usuario
  setRoles(){
    function containsRole(array:Array<any>, value:string):boolean {
      for (var i = 0; i < array.length; i++) {
        if(array[i].authority == value){return true;}
        else {return false;}
      }
    }
    this.roles = JSON.parse(localStorage.getItem('currentUser')).roles;
    //buscar el role en el arreglo role.authority
    this.roleAdmin = containsRole(this.roles, 'ROLE_ADMIN');
    //this.roleAdmin = this.roles.filter(role => role.authority === 'ROLE_ADMIN')?true:false;
    this.roleUser = containsRole(this.roles, 'ROLE_USER');
    //this.roleUser = this.roles.filter(role => role.authority === 'ROLE_USER')?true:false;
    
    //si no existen ninguno de los dos roles entonces isNoLogged = true
    this.noLogged = !(this.roleAdmin || this.roleUser);
  }

  
  
  isAdmin(): boolean{
    return this.roleAdmin;
  }
  isUser(): boolean{
    return this.roleUser;
  }
  isNoLogged(): boolean{
    return this.noLogged;
  }
  setNoLogged(roleNologged: boolean): void{
    this.noLogged = roleNologged;
  }

  cargarBE(): Promise<any>{
    return this.http.get<any>(WS_URL).toPromise();
  }


}
