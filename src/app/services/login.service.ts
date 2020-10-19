import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../interfaces/login.interface';

import{tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  validarToken(): boolean{
    const token = localStorage.getItem('token') || '';
    if(token !== ''){
      return true;
    }
    return false;
  }

  login(formData: LoginForm){
    return this.http.post(`/login`, formData)
    .pipe(
      tap( (resp:any) =>{
        localStorage.setItem('token', resp.token);
      })
    )
  }
}
