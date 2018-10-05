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

  //url de la peticion (url del servidor) + (endpoint)
  private loginUrl = WS_URL + "/login";

  constructor(private http: HttpClient) { }

  loginUser(username: string, password: string): Observable<any>{
    console.log(this.loginUrl);
    console.log(JSON.stringify({username: username, password: password}));
    console.log(httpOptions);
    return this.http.post(this.loginUrl, JSON.stringify({username: username, password: password}), httpOptions)
    .pipe(
      catchError(/*this.hError<boolean>('addHero')*/(error:any) =>  throwError(error || 'Server error'))
    );
  }

  //obtener el token desde el localStorage
  getToken(): String{
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser.token;
    return token ? token : ""; 

  }
}
