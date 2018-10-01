import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Energy } from './energy.model';
import { WS_URL } from './../httpconstants';

//cabeceras de la peticion http
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EnergyService {

  //url de la peticion (url del servidor) + (endpoint)
  private energyUrl = WS_URL + '/get_data';

  constructor(private http: HttpClient) { }

  //observar datos desde backend
  getEnergyData(idHouse): Observable<Energy[]>{
    return this.http.get<Energy[]>(`${this.energyUrl}/${idHouse}`)
  }
}
