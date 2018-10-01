import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Energy } from './energy.model';
import { WS_URL } from './../httpconstants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EnergyService {

  private energyUrl = WS_URL + '/get_data';

  constructor(private http: HttpClient) { }

  getEnergyData(idHouse): Observable<Energy[]>{
    return this.http.get<Energy[]>(`${this.energyUrl}/${idHouse}`)
  }
}
