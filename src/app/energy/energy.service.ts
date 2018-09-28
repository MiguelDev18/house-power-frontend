import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Energy } from './energy.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EnergyService {

  private energyUrl = 'http://localhost:8089/get_data';

  constructor(private http: HttpClient) { }

  getEnergyData(idHouse): Observable<Energy[]>{
    return this.http.get<Energy[]>(`${this.energyUrl}/${idHouse}`)
  }
}
