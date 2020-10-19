import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService,
             private router: Router,
             private ngZone: NgZone){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
 
     if(!this.loginService.validarToken()){

      this.ngZone.run(() =>{
        this.router.navigateByUrl('/login');
      });
     }

     return true;
     

  }
  
}
