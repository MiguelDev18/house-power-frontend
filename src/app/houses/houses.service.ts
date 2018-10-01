import { User } from './../users/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { House } from './house.model';
import { WS_URL } from './../httpconstants';

//cabeceras de la peticion
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  //url de la peticion (url del servidor) + (endpoint)
  private housesUrl = WS_URL + '/get_house_user';
  private houseUrl = WS_URL + '/get_house';
  private saveHouseUrl = WS_URL + '/save_house';
  private deleteHouseUrl = WS_URL + '/delete_house';

  constructor(private http: HttpClient) { }
  

  //observar la lista de hogares desde el backend
  getHouses(username: string): Observable<House[]>{
    return this.http.post<House[]>(this.housesUrl, JSON.stringify({"username":username}), httpOptions);
  }

  //obtener hogar por id
  getHouse(id):Observable<House>{
    return this.http.get<House>(`${this.houseUrl}/${id}`)
  }

  //guardar hogar en el backend
  saveHouse(house: House): Observable<any>{
    return this.http.post(this.saveHouseUrl,house,httpOptions)
  }

  //borrar hogar con id: houseID
  deleteHouse(houseID: number): Observable<any>{
    return this.http.post(this.deleteHouseUrl,JSON.stringify({"id":houseID}),httpOptions)
  }

  
}

