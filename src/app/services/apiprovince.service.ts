import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {ResponseApi} from '../models/responseApi';
import {Province} from '../models/province';

const httpOption  = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
};


@Injectable({
  providedIn: 'root'
})
export class ApiprovinceService {

  url: string ='https://localhost:44341/api/Province';
  constructor(
    private _http : HttpClient
  ) { }

getProvinces(countryId: number): Observable<ResponseApi>{
    return this._http.get<ResponseApi>(this.url + '?CountryId=' + countryId);
}
add(province: Province, countryId: number): Observable<ResponseApi>{
  return this._http.post<ResponseApi>(this.url,{countyId:countryId, name: province.name, abbrevation: province.abbrevation}, httpOption);
}

edit(province: Province, Id: number, countryId: number): Observable<ResponseApi>{
  return this._http.put<ResponseApi>(this.url + '?Id=' + Id  + '&countryId=' + countryId ,province, httpOption);
}

delete(id: number): Observable<ResponseApi>{
  return this._http.delete<ResponseApi>(`${this.url}/${id}`);
}
}
