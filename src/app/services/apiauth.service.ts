import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ResponseApi} from '../models/responseApi';
import { Usuario} from '../models/usuario';
import { map } from 'rxjs/operators';
import { Login } from '../models/login';

const httpOption  = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
  })

export class ApiAuthService {
    url2: string = 'https://localhost:44397/api/user/login';
    url: string ='https://localhost:44341/api/Token';

    private usuarioSubject: BehaviorSubject<ResponseApi>;

    public get usuarioData(): ResponseApi{
      return this.usuarioSubject.value;
    }

    constructor(private _http: HttpClient){
      this.usuarioSubject = new BehaviorSubject<ResponseApi>(JSON.parse(localStorage.getItem('usuario')));

    }

    login(login: Login): Observable<ResponseApi>{
        return this._http.post<ResponseApi>(this.url,login, httpOption).pipe(
          map(res =>{
            if(res.isValid){
              const user: ResponseApi = res.data;
              localStorage.setItem('usuario', JSON.stringify(user));
              this.usuarioSubject.next(user);
            }
            return res;
          })
        );
    }

    logOut(){
      localStorage.removeItem('usuario');
      this.usuarioSubject.next(null);
    }
}