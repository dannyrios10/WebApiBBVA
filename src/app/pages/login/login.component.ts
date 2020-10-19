
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;


  public loginForm = this.fb.group({
    email: ['danny@mail.com', [Validators.required, Validators.minLength(3)]],
    password: ['123456', [Validators.required, Validators.minLength(3)]]
  });

  constructor(private fb: FormBuilder,
              private usuarioLogin: LoginService,
              private router: Router,
              private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  loginUsuario(){
    this.formSubmitted = true;
    if(this.loginForm.valid){
      this.usuarioLogin.login(this.loginForm.value)
        .subscribe(resp=>{

          this.ngZone.run(() =>{
            this.router.navigateByUrl('/clientes');
          });
        }, (err) =>{
          console.log(err);
           Swal.fire('', err.error.err.msg, 'info');
        })
    }
  }

  

  campoNoValido(campo:string){
    if(this.loginForm.get(campo).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

 

}
