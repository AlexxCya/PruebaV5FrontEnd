import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiAuthService } from '../services/apiauth.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private _apiauthservice: ApiAuthService){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>
    {
        const usuario= this._apiauthservice.usuarioData;

        if (usuario){
            console.log('usuario',usuario);
            request = request.clone({
                setHeaders:{
                    Authorization: `Bearer ${usuario}`
                }
            });

        }

        return next.handle(request);

    }
}