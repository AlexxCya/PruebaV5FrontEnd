import { Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { ApiAuthService } from '../services/apiauth.service';

@Injectable({ providedIn: 'root'})

export class AuthGuard implements CanActivate {

    constructor(private _router: Router,
                private _apiAuthService: ApiAuthService
        )
    {

    }

    canActivate(route: ActivatedRouteSnapshot)
    {
        const usuario= this._apiAuthService.usuarioData;
        if (usuario){
            return true;
        }

        this._router.navigate(['/login']);
        return false;
    }

}