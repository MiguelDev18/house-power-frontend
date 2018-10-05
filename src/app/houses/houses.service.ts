import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './../users/user.model';
import { AuthenticationService } from './../authentication.service';
import { House } from './house.model';
import { WS_URL } from './../httpconstants';


@Injectable({
  providedIn: 'root'
})
export class HousesService {

  //cabeceras de la peticion
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    })
  };

  //url de la peticion (url del servidor) + (endpoint)
  private housesUrl = WS_URL + '/get_house_user';
  private houseUrl = WS_URL + '/get_house';
  private saveHouseUrl = WS_URL + '/save_house';
  private deleteHouseUrl = WS_URL + '/delete_house';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }
  

  //observar la lista de hogares desde el backend
  getHouses(username: string): Observable<House[]>{
    return this.http.post<House[]>(this.housesUrl, JSON.stringify({"username":username}), this.httpOptions);
  }

  //obtener hogar por id
  getHouse(id):Observable<House>{
    return this.http.get<House>(`${this.houseUrl}/${id}`, this.httpOptions)
  }

  //guardar hogar en el backend
  saveHouse(house: House): Observable<any>{
    return this.http.post(this.saveHouseUrl,house,this.httpOptions)
  }

  //borrar hogar con id: houseID
  deleteHouse(houseID: number): Observable<any>{
    return this.http.post(this.deleteHouseUrl,JSON.stringify({"id":houseID}),this.httpOptions)
  }

  
}

