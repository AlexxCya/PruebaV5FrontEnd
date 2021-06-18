import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {ResponseApi} from '../models/responseApi';
import {Country} from '../models/country';

const httpOption  = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class ApicountryService {

  url: string ='https://localhost:44341/api/Country';
  constructor(
    private _http : HttpClient
  ) { }

  getCountries(): Observable<ResponseApi>{
    return this._http.get<ResponseApi>(this.url);
}
add(country: Country): Observable<ResponseApi>{
  return this._http.post<ResponseApi>(this.url,country, httpOption);
}

edit(country: Country, Id: number): Observable<ResponseApi>{
  return this._http.put<ResponseApi>(this.url + '?Id=' + Id ,country, httpOption);
}

delete(id: number): Observable<ResponseApi>{
  return this._http.delete<ResponseApi>(`${this.url}/${id}`);
}
 

}

