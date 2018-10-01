import { User } from './../users/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { House } from './house.model';
import { WS_URL } from './../httpconstants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  private housesUrl = WS_URL + '/get_house_user';
  private houseUrl = WS_URL + '/get_house';
  private saveHouseUrl = WS_URL + '/save_house';
  private deleteHouseUrl = WS_URL + '/delete_house';

  constructor(private http: HttpClient) { }
  

  getHouses(username: string): Observable<House[]>{
    console.log(this.housesUrl);
    console.log(JSON.stringify({"username":username}));
    console.log(httpOptions);
    return this.http.post<House[]>(this.housesUrl, JSON.stringify({"username":username}), httpOptions)/*.pipe(
      catchError(this.handleError<House[]>('addHero'))
    )*/;
  }

  getHouse(id):Observable<House>{
    return this.http.get<House>(`${this.houseUrl}/${id}`)
  }

  saveHouse(house: House): Observable<any>{
    return this.http.post(this.saveHouseUrl,house,httpOptions)
  }

  deleteHouse(houseID: number): Observable<any>{
    return this.http.post(this.deleteHouseUrl,JSON.stringify({"id":houseID}),httpOptions)
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}

