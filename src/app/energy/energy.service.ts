import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { AuthenticationService } from './../authentication.service';
import { Energy } from './energy.model';
import { WS_URL } from './../httpconstants';


@Injectable({
  providedIn: 'root'
})
export class EnergyService {

  //cabeceras de la peticion
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
    })
  };

  //url de la peticion (url del servidor) + (endpoint)
  private energyUrl = WS_URL + '/get_data';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  //observar datos desde backend
  getEnergyData(idHouse): Observable<Energy[]>{
    return this.http.get<Energy[]>(`${this.energyUrl}/${idHouse}`, this.httpOptions)
  }
}
